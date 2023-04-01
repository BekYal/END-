var TextTransform = {
	transformToName(str) {
		var words = str.split(/(?=[A-Z])/);
		for (var i = 0; i < words.length; i++) {
			words[i] = words[i].toLowerCase();
			if (i > 0) {
				words[i] = ' ' + words[i];
			}
		}
		return words.join('');
	},
	transformToTexture(str) {
		TextTransform.transformToName(str).replace(/ /g, '_');
	}
};

const WandApi = {
	createWand: function(name, damage, func, decrease) {
		let strN = TextTransform.transformToName(name);
		IDRegistry.genItemID(name);
		Item.createItem(name, strN, { name: name, data: 0 }, { stack: 1 }, { damage: damage });

		Item.setMaxDamage(ItemID[name], damage);
		Item.setMaxUseDuration(ItemID[name], 6000);

		let jiu = 0;
		Callback.addCallback('ItemUseNoTarget', function(item, player) {
			if (item.id == ItemID[name]) {
				jiu = 1;
			}
		});
		Callback.addCallback('ItemUsingReleased', function(item, player) {
			if (item.id == ItemID[name]) {
				jiu = 0;
			}
		});
		Callback.addCallback("ServerPlayerTick", function(player) {
			if (jiu == 1 && World.getThreadTime() % 20 == 0) {
				let item = Entity.getCarriedItem(player),
					pos = Entity.getPosition(player),
					vec = Entity.getLookVector(player);
				func(player, pos, vec, item);
				Entity.setCarriedItem(player, item.id, item.count, item.data + decrease || 1, item.extra);
			}
		});
	}
};

const BigSwords = {
	create: function(name, material) {
		ItemRegistry.createTool(name, {
			name: TextTransform.transformToName(name),
			icon: TextTransform.transformToTexture(name),
			material: { level: material.level, durability: material.durability, damage: material.damage }
		});
		Item.setEnchantType(ItemID[name], Native.EnchantType.weapon, material.enchantibility || [0]);
		Item.addRepairItemIds(ItemID[name], material.repairItems || [0]);

		Recipes.addShaped({ id: ItemID[name], count: 1, data: 0 },
		['i', 'i', 'a'],
		['i', material.id, -1, 'a', 5, 0]);
	}
};
//ItemRegistry.createTool("greenSapphireAxe", {name: "Green Sapphire Axe", icon: "green_sapphire_axe", material: "greenSapphire"}, ToolType.AXE)
const Hammers = {
	create: function(name, material) {
		ItemRegistry.createTool(name, {
			name: TextTransform.transformToName(name),
			icon: TextTransform.transformToName(name).replace(/ /g, '_'),
			material: { level: material.level, durability: material.durability, damage: material.damage }
		}, ToolType.PICKAXE);
		
		Item.setEnchantType(ItemID[name], Native.EnchantType.pickaxe, material.enchantibility || [0]);
		Item.addRepairItemIds(ItemID[name], material.repairItems || [0]);
		
		Recipes.addShaped({ id: ItemID[name], count: 1, data: 0 },
			['iii', 'iai', ' a '],
			['i', material.id, -1, 'a', 5, 0]);
			
		Callback.addCallback("DestroyBlock", function(coords, block, player) {
			let side = coords.side, X = 1, Y = 1, Z = 1;
			if (side == 4 || side == 5) X = 0;
			if (side == 1 || side == 6) Y = 0;
			if (side == 2 || side == 3) Z = 0;
			
			
			for (var xx = coords.x - X; xx <= coords.x + X; xx++) {
				for (var yy = coords.y - Y; yy <= coords.y + Y; yy++) {
					for (var zz = coords.z - Z; zz <= coords.z + Z; zz++) {
						var item = Entity.getCarriedItem(player);
						if (World.getBlockID(xx, yy, zz) !== 7 && item.id == ItemID[name]) {
							World.destroyBlock(xx, yy, zz, true);
						}
					}
				}
			}
		});
	}
};








/*
const Hammers = {
	create: function(name, material) {
		ItemRegistry.createTool(name, {
			name: TextTransform.transformToName(name),
			icon: TextTransform.transformToName(name).replace(/ /g, '_'),
			material: { level: material.level, durability: material.durability, damage: material.damage }
		}, ToolType.PICKAXE);

		Item.setEnchantType(ItemID[name], Native.EnchantType.pickaxe, material.enchantibility || [0]);
		Item.addRepairItemIds(ItemID[name], material.repairItems || [0]);

		Recipes.addShaped({ id: ItemID[name], count: 1, data: 0 },
   ['iii', 'iai', ' a '],
   ['i', material.id, -1, 'a', 5, 0]);
	},


	Callback.addCallback("DestroyBlock", function(coords, block, player) {
		var side = coords.side;
		var X = 1;
		var Y = 1;
		var Z = 1;
		switch (side) {
			case 5:
				X = 0;
				break;

			case 1:
			case 6:
				Y = 0;
				break;

			case 2:
			case 3:
				Z = 0;
				break;

		}
		for (var xx = coords.x - X; xx <= coords.x + X; xx++) {
			for (var yy = coords.y - Y; yy <= coords.y + Y; yy++) {
				for (var zz = coords.z - Z; zz <= coords.z + Z; zz++) {
					var item = Entity.getCarriedItem(player);
					if (World.getBlockID(xx, yy, zz) !== 7 && item.id == ItemID[name]) { //используем значение переменной "name" из объекта Hammers
						World.destroyBlock(xx, yy, zz, true);
					}
				}
			}
		}
	});
};
*/




/*

Item.addRepairItemIds(ItemID.woodhammer, [17]);
Item.setEnchantType(ItemID.woodhammer, Native.EnchantType.pickaxe, 140);
hammers.addItem("wood", "wood", 17, 5);


var hammers = {
	addItem: function(id, material, i1, i2) {
		IDRegistry.genItemID(id + "hammer");
		Item.createItem(id + "hammer", id + " hammer", { name: id + "hammer", meta: 0 }, { stack: 1 });
		Item.setToolRender(ItemID[id + "hammer"], true);
		ToolAPI.registerTool(ItemID[id + "hammer"], material, ["stone"], { damage: 5 });
		Callback.addCallback("PostLoaded", function() {
			Recipes.addShaped({ id: ItemID[id + "hammer"], count: 1, data: 0 }, [
				"aaa",
				"aba",
				" b "
			], ['a', i1, -1, 'b', i2, -1]);
		});
	}
};

ToolAPI.addToolMaterial("gold", {
	durability: 360,
	level: 2,
	efficiency: 20,
	damage: 0,
	enchantability: 15
});


hammers.addItem("stone", "stone", 4, 5);
hammers.addItem("gold", "gold", 266, 5);
hammers.addItem("iron", "iron", 265, 5);
hammers.addItem("diamond", "diamond", 264, 5);
//hammers.addItem("obsidian", "obsidian", 49, 5);


Item.setEnchantType(ItemID.stonehammer, Native.EnchantType.pickaxe, 14);
Item.setEnchantType(ItemID.goldhammer, Native.EnchantType.pickaxe, 50);
Item.setEnchantType(ItemID.ironhammer, Native.EnchantType.pickaxe, 14);
Item.setEnchantType(ItemID.diamondhammer, Native.EnchantType.pickaxe, 14);


Item.addRepairItemIds(ItemID.stonehammer, [1]);
Item.addRepairItemIds(ItemID.goldhammer, [266]);
Item.addRepairItemIds(ItemID.ironhammer, [265]);
Item.addRepairItemIds(ItemID.diamondhammer, [264]);

Callback.addCallback("DestroyBlock", function(coords, block, player) {
	var side = coords.side;
	var X = 1;
	var Y = 1;
	var Z = 1;
	if (side == 4 || side == 5) {
		X = 0;
	}
	if (side == 1 || side == 6) {
		Y = 0;
	}
	if (side == 2 || side == 3) {
		Z = 0;
	}
	for (var xx = coords.x - X; xx <= coords.x + X; xx++) {
		for (var yy = coords.y - Y; yy <= coords.y + Y; yy++) {
			for (var zz = coords.z - Z; zz <= coords.z + Z; zz++) {
				var item = Entity.getCarriedItem(player);
				if (World.getBlockID(xx, yy, zz) !== 7
				&& item.id == ItemID.woodhammer || World.getBlockID(xx, yy, zz) !== 7 
				&& item.id == ItemID.stonehammer || World.getBlockID(xx, yy, zz) !== 7 
				&& item.id == ItemID.goldhammer || World.getBlockID(xx, yy, zz) !== 7 
				&& item.id == ItemID.ironhammer || World.getBlockID(xx, yy, zz) !== 7 
				&& item.id == ItemID.diamondhammer || World.getBlockID(xx, yy, zz) !== 7 
				&& item.id == ItemID.obsidianhammer) {
					World.destroyBlock(xx, yy, zz, true);
				}
			}
		}
	};
});*/