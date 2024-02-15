import type {
	Arrow,
	Bracelet,
	Countable,
	Food,
	Grass,
	Item,
	Incense,
	ItemStatable,
	Pot,
	Rock,
	Scroll,
	Shield,
	Staff,
	Weapon
} from './definitions';

export function isCountable(item: object): item is Countable {
	return 'count' in item;
}

export function isItemStatable(item: object): item is ItemStatable {
	return (
		'status' in item &&
		(item['status'] === 'normal' || item['status'] === 'cursed' || item['status'] === 'blessed')
	);
}

export function isWeapon(item: Item): item is Weapon {
	return item['type'] === 'weapon';
}

export function isShield(item: Item): item is Shield {
	return item['type'] === 'shield';
}

export function isBracelet(item: Item): item is Bracelet {
	return item['type'] === 'bracelet';
}

export function isArrow(item: Item): item is Arrow {
	return item['type'] === 'arrow';
}

export function isRock(item: Item): item is Rock {
	return item['type'] === 'rock';
}

export function isStaff(item: Item): item is Staff {
	return item['type'] === 'staff';
}

export function isFood(item: Item): item is Food {
	return item['type'] === 'food';
}

export function isGrass(item: Item): item is Grass {
	return item['type'] === 'grass';
}

export function isScroll(item: Item): item is Scroll {
	return item['type'] === 'scroll';
}

export function isIncense(item: Item): item is Incense {
	return item['type'] === 'incense';
}

export function isPot(item: Item): item is Pot {
	return item['type'] === 'pot';
}

export function isWeaponWithStatus(item: Item): item is Weapon & ItemStatable {
	return isWeapon(item) && isItemStatable(item);
}

export function isShieldWithStatus(item: Item): item is Shield & ItemStatable {
	return isShield(item) && isItemStatable(item);
}

export function isBraceletWithStatus(item: Item): item is Bracelet & ItemStatable {
	return isBracelet(item) && isItemStatable(item);
}

export function isArrowWithStatus(item: Item): item is Arrow & ItemStatable {
	return isArrow(item) && isItemStatable(item) && isCountable(item);
}

export function isRockWithStatus(item: Item): item is Rock & ItemStatable {
	return isRock(item) && isItemStatable(item) && isCountable(item);
}

export function isFoodWithStatus(item: Item): item is Food & ItemStatable {
	return isFood(item) && isItemStatable(item);
}

export function isGrassWithStatus(item: Item): item is Grass & ItemStatable {
	return isGrass(item) && isItemStatable(item);
}

export function isScrollWithStatus(item: Item): item is Scroll & ItemStatable {
	return isScroll(item) && isItemStatable(item);
}

export function isStaffWithStatus(item: Item): item is Staff & ItemStatable {
	return isStaff(item) && isItemStatable(item) && isCountable(item);
}

export function isIncenseWithStatus(item: Item): item is Incense & ItemStatable {
	return isIncense(item) && isItemStatable(item) && isCountable(item);
}

export function isPotWithStatus(item: Item): item is Pot & ItemStatable {
	return isPot(item) && isItemStatable(item) && isCountable(item);
}
