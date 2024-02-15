import { BigNumber } from 'bignumber.js';
import { arrows } from './arrow';
import { bracelets } from './bracelet';
import { foods } from './food';
import { grasses } from './grass';
import { incenses } from './incense';
import { pots } from './pot';
import { rocks } from './rock';
import { scrolls } from './scroll';
import { shields } from './shield';
import { staffs } from './staff';
import { weapons } from './weapon';
import type {
	ArrowWithStatus,
	BraceletWithStatus,
	FoodWithStatus,
	GrassWithStatus,
	IncenseWithStatus,
	ItemKind,
	PotWithStatus,
	RockWithStatus,
	ScrollWithStatus,
	ShieldWithStatus,
	StaffWithStatus,
	WeaponWithStatus
} from '.';

/**
 * アイテム一覧
 */
export const items: readonly ItemKind[] = [
	...weapons,
	...shields,
	...bracelets,
	...arrows,
	...rocks,
	...foods,
	...grasses,
	...scrolls,
	...staffs,
	...incenses,
	...pots
];

/**
 * 呪われたアイテムの売値の係数
 */
export const cursedItemSellPriceRatio = 0.87;

/**
 * 祝福されたアイテムの売値の係数
 */
export const blessedItemSellPriceRatio = 2.0;

/**
 * 呪われたアイテムの値段を計算する
 * @param price 通常時の値段
 * @returns 呪われたアイテムの値段
 */
export function calculateCursedItemPrice(price: number): number {
	return (
		new BigNumber(price)
			.multipliedBy(cursedItemSellPriceRatio)
			/// TODO: 四捨五入, これでいいのかは要確認
			.integerValue(BigNumber.ROUND_DOWN)
			.toNumber()
	);
}

/**
 *  祝福されたアイテムの値段を計算する
 * @param price 通常時の値段
 * @returns 祝福されたアイテムの値段
 */
export function calculateBlessedItemPrice(price: number): number {
	// 祝福されたアイテムは係数が自然数なので、BigNumberを使わなくてもいいはず
	return price * blessedItemSellPriceRatio;
}

export const weaponsWithStatus: readonly WeaponWithStatus[] = weapons.flatMap((weapon) => [
	// 通常武器 0 ~ 3
	...Array.from(new Array(4).keys()).map((n) => {
		const plus = n;
		return {
			...weapon,
			name: `${weapon.name}${plus < 0 ? '-' : '+'}${Math.abs(plus)}`,
			buyPrice: weapon.buyPrice + plus * weapon.plusBuyPrice,
			sellPrice: weapon.sellPrice + plus * weapon.plusSellPrice,
			status: 'normal',
			count: plus
		} as WeaponWithStatus;
	}),

	// 呪い -1 ~ -1
	...Array.from(new Array(0).keys()).map((n) => {
		const plus = n - 1;
		return {
			...weapon,
			name: `${weapon.name}${plus < 0 ? '-' : '+'}${Math.abs(plus)}`,
			buyPrice: calculateCursedItemPrice(weapon.buyPrice) + plus * weapon.plusBuyPrice,
			sellPrice: calculateCursedItemPrice(weapon.sellPrice) + plus * weapon.plusSellPrice,
			status: 'cursed',
			count: plus
		} as WeaponWithStatus;
	})
]);

export const shieldsWithStatus: readonly ShieldWithStatus[] = shields.flatMap((shield) => [
	// 通常盾 0 ~ 3
	...Array.from(new Array(4).keys()).map((n) => {
		const plus = n;
		return {
			...shield,
			name: `${shield.name}${plus < 0 ? '-' : '+'}${Math.abs(plus)}`,
			buyPrice: shield.buyPrice + plus * shield.plusBuyPrice,
			sellPrice: shield.sellPrice + plus * shield.plusSellPrice,
			status: 'normal',
			count: plus
		} as ShieldWithStatus;
	}),
	// 呪い -1 ~ -1
	...Array.from(new Array(0).keys()).map((n) => {
		const plus = n - 1;
		return {
			...shield,
			name: `${shield.name}${plus < 0 ? '-' : '+'}${Math.abs(plus)}`,
			buyPrice: calculateCursedItemPrice(shield.buyPrice) + plus * shield.plusBuyPrice,
			sellPrice: calculateCursedItemPrice(shield.sellPrice) + plus * shield.plusSellPrice,
			status: 'cursed',
			count: plus
		} as ShieldWithStatus;
	})
]);

export const braceletsWithStatus: readonly BraceletWithStatus[] = bracelets.flatMap((bracelet) => [
	{
		...bracelet,
		status: 'normal'
	},
	{
		...bracelet,
		buyPrice: calculateCursedItemPrice(bracelet.buyPrice),
		sellPrice: calculateCursedItemPrice(bracelet.sellPrice),
		status: 'cursed'
	}
]);

export const arrowsWithStatus: readonly ArrowWithStatus[] = arrows.flatMap((arrow) =>
	// 1-99本
	Array.from(new Array(99).keys())
		.map((n) => n + 1)
		.flatMap((n) => [
			{
				...arrow,
				buyPrice: arrow.buyPrice * n,
				sellPrice: arrow.sellPrice * n,
				status: 'normal',
				count: n
			},
			{
				...arrow,
				buyPrice: calculateCursedItemPrice(arrow.buyPrice) * n,
				sellPrice: calculateCursedItemPrice(arrow.sellPrice) * n,
				status: 'cursed',
				count: n
			}
		])
);

export const rockWithStatus: readonly RockWithStatus[] = rocks.flatMap((rock) =>
	Array.from(new Array(99).keys())
		.map((n) => n + 1)
		.flatMap((n) => [
			{
				...rock,
				buyPrice: rock.buyPrice * n,
				sellPrice: rock.sellPrice * n,
				status: 'normal',
				count: n
			},
			{
				...rock,
				buyPrice: calculateCursedItemPrice(rock.buyPrice) * n,
				sellPrice: calculateCursedItemPrice(rock.sellPrice) * n,
				status: 'cursed',
				count: n
			}
		])
);

export const foodsWithStatus: readonly FoodWithStatus[] = foods.flatMap((food) => [
	{
		...food,
		status: 'normal'
	},
	{
		...food,
		buyPrice: calculateCursedItemPrice(food.buyPrice),
		sellPrice: calculateCursedItemPrice(food.sellPrice),
		status: 'cursed'
	},
	{
		...food,
		buyPrice: calculateBlessedItemPrice(food.buyPrice),
		sellPrice: calculateBlessedItemPrice(food.sellPrice),
		status: 'blessed'
	}
]);

export const grassesWithStatus: readonly GrassWithStatus[] = grasses.flatMap((grass) => [
	{
		...grass,
		status: 'normal'
	},
	{
		...grass,
		buyPrice: calculateCursedItemPrice(grass.buyPrice),
		sellPrice: calculateCursedItemPrice(grass.sellPrice),
		status: 'cursed'
	},
	{
		...grass,
		buyPrice: calculateBlessedItemPrice(grass.buyPrice),
		sellPrice: calculateBlessedItemPrice(grass.sellPrice),
		status: 'blessed'
	}
]);

export const scrollsWithStatus: readonly ScrollWithStatus[] = scrolls.flatMap((scroll) => [
	{
		...scroll,
		status: 'normal'
	},
	{
		...scroll,
		buyPrice: calculateCursedItemPrice(scroll.buyPrice),
		sellPrice: calculateCursedItemPrice(scroll.sellPrice),
		status: 'cursed'
	},
	{
		...scroll,
		buyPrice: calculateBlessedItemPrice(scroll.buyPrice),
		sellPrice: calculateBlessedItemPrice(scroll.sellPrice),
		status: 'blessed'
	}
]);

export const staffsWithStatus: readonly StaffWithStatus[] = staffs.flatMap((staff) =>
	// TODO: この実装でよいかは要検討
	// 0-99回
	Array.from(new Array(100).keys()).flatMap((n) => [
		{
			...staff,
			buyPrice: staff.buyPrice + n * staff.plusBuyPrice,
			sellPrice: staff.sellPrice + n * staff.plusSellPrice,
			status: 'normal',
			count: n
		},
		{
			...staff,
			buyPrice: calculateCursedItemPrice(staff.buyPrice) + n * staff.plusBuyPrice,
			sellPrice: calculateCursedItemPrice(staff.sellPrice) + n * staff.plusSellPrice,
			status: 'cursed',
			count: n
		}
	])
);

export const incensesWithStatus: readonly IncenseWithStatus[] = incenses.flatMap((incense) =>
	// 2-5
	Array.from(new Array(4).keys())
		.map((n) => n + 2)
		.flatMap((n) => [
			{
				...incense,
				buyPrice: incense.buyPrice + n * incense.plusBuyPrice,
				sellPrice: incense.sellPrice + n * incense.plusSellPrice,
				status: 'normal',
				count: n
			},
			{
				...incense,
				buyPrice: calculateCursedItemPrice(incense.buyPrice + n * incense.plusBuyPrice),
				sellPrice: calculateCursedItemPrice(incense.sellPrice + n * incense.plusSellPrice),
				status: 'cursed',
				count: n
			}
		])
);

export const potsWithStatus: readonly PotWithStatus[] = pots.flatMap((pot) =>
	// 2-5
	Array.from(new Array(4).keys())
		.map((n) => n + 2)
		.flatMap((n) => [
			{
				...pot,
				status: 'normal',
				buyPrice: pot.buyPrice + n * pot.plusBuyPrice,
				sellPrice: pot.sellPrice + n * pot.plusSellPrice,
				count: n
			},
			{
				...pot,
				buyPrice: calculateCursedItemPrice(pot.buyPrice + n * pot.plusBuyPrice),
				sellPrice: calculateCursedItemPrice(pot.sellPrice + n * pot.plusSellPrice),
				status: 'cursed',
				count: n
			}
		])
);
