import type { ItemKindWithStatus } from '$lib/item';
import {
	arrowsWithStatus,
	braceletsWithStatus,
	foodsWithStatus,
	grassesWithStatus,
	incensesWithStatus,
	potsWithStatus,
	rockWithStatus,
	scrollsWithStatus,
	shieldsWithStatus,
	staffsWithStatus,
	weaponsWithStatus
} from '$lib/item/items';
import type { ItemSelectOptions } from './item-select-options';

export interface FilterParams extends ItemSelectOptions {
	/**
	 * 金額
	 */
	price: number;
}

function filterItemInner(
	params: FilterParams,
	items: readonly ItemKindWithStatus[]
): readonly ItemKindWithStatus[] {
	return items.filter((item) => {
		if (!params.cursed && item.status === 'cursed') {
			return false;
		}
		if (!params.blessed && item.status === 'blessed') {
			return false;
		}
		if (!params.normal && item.status === 'normal') {
			return false;
		}

		return (
			(params.buy && item.buyPrice === params.price) ||
			(params.sell && item.sellPrice === params.price)
		);
	});
}

export function filterItems(params: FilterParams): ItemKindWithStatus[] {
	const r: ItemKindWithStatus[] = [];

	if (params.weapon) {
		r.push(...filterItemInner(params, weaponsWithStatus));
	}
	if (params.shield) {
		r.push(...filterItemInner(params, shieldsWithStatus));
	}
	if (params.bracelet) {
		r.push(...filterItemInner(params, braceletsWithStatus));
	}
	if (params.arrow) {
		r.push(...filterItemInner(params, [...arrowsWithStatus, ...rockWithStatus]));
	}
	if (params.food) {
		r.push(...filterItemInner(params, foodsWithStatus));
	}
	if (params.grass) {
		r.push(...filterItemInner(params, grassesWithStatus));
	}
	if (params.staff) {
		r.push(...filterItemInner(params, staffsWithStatus));
	}

	if (params.scroll) {
		r.push(...filterItemInner(params, scrollsWithStatus));
	}
	if (params.pot) {
		r.push(...filterItemInner(params, [...potsWithStatus, ...incensesWithStatus]));
	}

	return r;
}
