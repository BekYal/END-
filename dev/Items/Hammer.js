/*var hammers = {
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

hammers.addItem("wood", "wood", 17, 5);
hammers.addItem("stone", "stone", 4, 5);
hammers.addItem("gold", "gold", 266, 5);
hammers.addItem("iron", "iron", 265, 5);
hammers.addItem("diamond", "diamond", 264, 5);
//hammers.addItem("obsidian", "obsidian", 49, 5);



Item.setEnchantType(ItemID.woodhammer, Native.EnchantType.pickaxe, 140);
Item.setEnchantType(ItemID.stonehammer, Native.EnchantType.pickaxe, 14);
Item.setEnchantType(ItemID.goldhammer, Native.EnchantType.pickaxe, 50);
Item.setEnchantType(ItemID.ironhammer, Native.EnchantType.pickaxe, 14);
Item.setEnchantType(ItemID.diamondhammer, Native.EnchantType.pickaxe, 14);


Item.addRepairItemIds(ItemID.woodhammer, [17]);
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
				if (World.getBlockID(xx, yy, zz) !== 7 && item.id == ItemID.woodhammer || World.getBlockID(xx, yy, zz) !== 7 && item.id == ItemID.stonehammer || World.getBlockID(xx, yy, zz) !== 7 && item.id == ItemID.goldhammer || World.getBlockID(xx, yy, zz) !== 7 && item.id == ItemID.ironhammer || World.getBlockID(xx, yy, zz) !== 7 && item.id == ItemID.diamondhammer || World.getBlockID(xx, yy, zz) !== 7 && item.id == ItemID.obsidianhammer) {
					World.destroyBlock(xx, yy, zz, true);
				}
			}
		}
	};
});*/