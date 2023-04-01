	IDRegistry.genItemID("magnet");
	Item.createItem("magnet", "магнит", { name: "magnet", meta: 0 }, { stack: 1 });
	Recipes.addShaped({ id: ItemID.magnet, count: 1, data: 0 }, [
	"a b",
	"x x",
	"xxx"
], ['x', 265, -1, 'b', 266, -1, 'a', 331, -1]);

	var drop = [64];
	Callback.addCallback("ServerPlayerTick", function(player) {
		var pos = Entity.getPosition(player);
		for (var s = 0; s < 40; s++) {
			let actor = new PlayerActor(player);
			let slot = actor.getInventorySlot(s);
			if (slot.id == ItemID.magnet) {
				let ent = Entity.findNearest({ x: pos.x, y: pos.y, z: pos.z }, 64, 6);
					if (ent) {
						let pos2 = Entity.getPosition(ent);
						while(pos2.x == pos.x && pos2.y == pos.y && pos2.z == pos.z){
						Entity.setPosition(ent, pos2.x++, pos2.y++, pos2.z++);
					}
				}
			}
		}
	});