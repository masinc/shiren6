import type { ItemCategory, ItemKindWithStatus } from '$lib/item';

export type ViewItemCategory =
	| 'weapon'
	| 'shield'
	| 'bracelet'
	| 'arrow'
	| 'food'
	| 'grass'
	| 'scroll'
	| 'staff'
	| 'pot';

export const ItemIconMap: Record<ViewItemCategory, string> = {
	weapon: 'mdi:sword',
	shield: 'mdi:shield',
	bracelet: 'mdi:bracelet',
	arrow: 'mdi:arrow',
	food: 'mdi:food',
	grass: 'mdi:grass',
	scroll: 'mdi:scroll',
	staff: 'mdi:staff',
	pot: 'mdi:pot'
};

export interface ViewItem {
	id: string;
	/**
	 * 表示名
	 */
	name: string;

	/**
	 * カテゴリ
	 */
	category: ViewItemCategory;

	/**
	 * 買値
	 */
	buyPrice: number;

	/**
	 * 売値
	 */
	sellPrice: number;

	/**
	 * アイテム状態
	 */
	status: 'normal' | 'cursed' | 'blessed';
}

function convertToViewItemCategory(category: ItemCategory): ViewItemCategory {
	switch (category) {
		case 'weapon':
			return 'weapon';
		case 'shield':
			return 'shield';
		case 'bracelet':
			return 'bracelet';
		case 'arrow':
			return 'arrow';
		case 'rock':
			return 'arrow';
		case 'food':
			return 'food';
		case 'grass':
			return 'grass';
		case 'scroll':
			return 'scroll';
		case 'staff':
			return 'staff';
		case 'incense':
			return 'pot';
		case 'pot':
			return 'pot';
	}
}

export function convertToViewItem(item: ItemKindWithStatus): ViewItem {
	const namePrefix =
		item.status === 'cursed' ? '(呪い)' : item.status === 'blessed' ? '(祝福)' : '';
	const nameSuffix = (() => {
		switch (item.type) {
			case 'arrow':
				return `(${item.count}本)`;
			case 'rock':
				return `(${item.count}個)`;
			case 'staff':
				return `(${item.count}回)`;
			case 'incense':
				return `(${item.count})`;
			case 'pot':
				return `(${item.count})`;
			default:
				return '';
		}
	})();

	return {
		id: item.id,
		name: `${namePrefix}${item.name}${nameSuffix}`,
		category: convertToViewItemCategory(item.type),
		buyPrice: item.buyPrice,
		sellPrice: item.sellPrice,
		status: item.status
	};
}
