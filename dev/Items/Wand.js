



/*
IDRegistry.genItemID("shuStuff");
Item.createItem("shuStuff", "staff of shulker", { name: "shulkerWand", meta: 0 }, { stack: 1 }, { damage: 234 });
Item.setMaxDamage(ItemID.shuStuff, 234);

IDRegistry.genItemID("fiStuff");
Item.createItem("fiStuff", "staff of fire", { name: "fireWand", meta: 0 }, { stack: 1 }, { damage: 234 });
Item.setMaxDamage(ItemID.fiStuff, 234);



Item.registerNoTargetUseFunction("tntStuff", function(item) {
	if (item.id == ItemID.tntStuff) {
		let pos = Player.getPosition();
		let vec = Entity.getLookVector(Player.get());
		
		{
			
			ToolAPI.breakCarriedTool(1);
		}
	}
});
*/
WandApi.createWand('TntWand', 300, function(player, pos, vec, item){
	var mob = Entity.spawn(pos.x + 0.5, pos.y + 1, pos.z + 0.5, 65);
	Entity.setVelocity(mob, 1 * vec.x, 0.5 * vec.y, 1 * vec.z);
});

WandApi.createWand('WitherScullWand', 300, function(player, pos, vec, item) {
	var mob = Entity.spawn(pos.x, pos.y + 1, pos.z, 89);
	Entity.setVelocity(mob, 2.5 * vec.x, 1.5 * vec.y, 2.5 * vec.z);
});

WandApi.createWand('RegenerationWand', 300, function(player, pos, vec, item){
	Entity.addEffect(player, 10, 2, 234, false);
});

WandApi.createWand('ArrowWand', 400, function(player, pos, vec, item){
	var mob = Entity.spawn(pos.x + 0.5, pos.y + 1, pos.z + 0.5, 80);
	Entity.setVelocity(mob, 2 * vec.x, 2 * vec.y, 2 * vec.z);
});

WandApi.createWand('FireWand', 400, function(player, pos, vec, item){
	var mob = Entity.spawn(pos.x, pos.y + 1, pos.z, 85);
	Entity.setVelocity(mob, 1.7 * vec.x, 1.8 * vec.y, 1.7 * vec.z);
});

WandApi.createWand('ShulkerWand', 300, function(player, pos, vec, item){
	var mob = Entity.spawn(pos.x, pos.y + 1, pos.z, 76);
	Entity.setVelocity(mob, 2 * vec.x, 2 * vec.y, 2 * vec.z);
});


IDRegistry.genItemID("airWand");
Item.createItem("airWand", "airWand", { name: "rending_gale", data: 0 }, {stack: 1});
Item.setMaxUseDuration(ItemID.airWand, 6000);

let letychieCheloveki = [];
Item.registerNoTargetUseFunction(ItemID.airWand, function(item, player) {
	if (!~letychieCheloveki.indexOf(player))
		letychieCheloveki.push(player);
});

Item.registerUsingReleasedFunction(ItemID.airWand, function(item, ticks, player) {
	let index = letychieCheloveki.indexOf(player);
	if (!!~index)
		letychieCheloveki.splice(index, 1);
});

Callback.addCallback("ServerPlayerTick", function() {
	for (let i in letychieCheloveki) {
		let player = letychieCheloveki[i];
		if (Entity.getCarriedItem(player).id != ItemID.airWand) {
			letychieCheloveki.splice(i, 1);
			continue;
		}
		let vec = Entity.getLookVector(player);
		Entity.setVelocity(player, vec.x * 1.8, vec.y * 1.8, vec.z * 1.8);
	}
});

//крафт посохов
IDRegistry.genItemID("goldStickL");
Item.createItem("goldStickL", "gold stick", { name: "blaze_rod", meta: 0 }, { stack: 64 });
Recipes.addShaped({ id: ItemID.goldStickL, count: 1, data: 0 }, [
	"aba",
	"bcb",
	"aba "
], ['a', 348, -1, 'b', 266, -1, 'c', 280, -1]);
Recipes.addShaped({ id: ItemID.TntWand, count: 1, data: 0 }, [
	" ba",
	" ab",
	"a  "
], ['a', ItemID.goldStickL, -1, 'b', 46, -1]);
Recipes.addShaped({ id: ItemID.RegenerationWand, count: 1, data: 0 }, [
	" ba",
	" ab",
	"a  "
], ['a', ItemID.goldStickL, -1, 'b', 322, -1]);
Recipes.addShaped({ id: ItemID.ArrowWand, count: 1, data: 0 }, [
	" ba",
	" ab",
	"a  "
], ['a', ItemID.goldStickL, -1, 'b', 262, -1]);
Recipes.addShaped({ id: ItemID.ShulkerWand, count: 1, data: 0 }, [
	" ba",
	" ab",
	"a  "
], ['a', ItemID.goldStickL, -1, 'b', 445, -1]);

Recipes.addShaped({ id: ItemID.FireWand, count: 1, data: 0 }, [
	" ba",
	" ab",
	"a  "
], ['a', ItemID.goldStickL, -1, 'b', 259, -1]);
/*

//



*/
//функции 