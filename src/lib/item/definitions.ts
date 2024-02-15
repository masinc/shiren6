/**
 * アイテムの種別
 */
export type ItemCategory =
	| 'weapon'
	| 'shield'
	| 'bracelet'
	| 'arrow'
	| 'rock'
	| 'food'
	| 'grass'
	| 'scroll'
	| 'staff'
	| 'incense'
	| 'pot';

/**
 * アイテムの状態
 * normal: 通常
 * cursed: 呪われた
 * blessed: 祝福された
 */
export type ItemStatus = 'normal' | 'cursed' | 'blessed';

/**
 * 祝福状態を除いたアイテムの状態
 */
export type ItemStatusWithOutBlessed = 'normal' | 'cursed';

/**
 * 識別状態
 */
export type IdentificationStatus = 'always' | 'never';

/**
 * アイテムの状態を持つインターフェース
 */
export interface ItemStatable {
	/**
	 * アイテムの状態
	 */
	status: ItemStatus;
}

export interface ItemStatableWithOutBlessed {
	/**
	 * アイテムの状態
	 */
	status: ItemStatusWithOutBlessed;
}

/**
 * 回数状態を持つインターフェース
 */
export interface Countable {
	count: number;
}

/**
 * アイテムの基本情報インターフェース
 */
export interface Item {
	/// アイテムID
	id: string;
	/// アイテムの種別
	type: ItemCategory;
	/// アイテム名
	name: string;
	/// 買値
	buyPrice: number;
	/// 売値
	sellPrice: number;
	/// アイテムの説明
	description?: string;

	/// 武器に合成した時の印効果
	compositeRuneEffectForWeapon?: string;
	/// 盾に合成した時の印効果
	compositeRuneEffectForShield?: string;

	/// 識別状態
	identificationStatus: IdentificationStatus;
}

/**
 * 武器
 */
export interface Weapon extends Item {
	type: 'weapon';

	/**
	 * 攻撃力
	 */
	attack: number;

	/**
	 * 印数
	 */
	runeCount: number;

	/**
	 * +1の場合の買値の増加
	 */
	plusBuyPrice: number;

	/**
	 * +1の場合の売値の増加
	 */
	plusSellPrice: number;

	/**
	 * 共鳴する盾
	 */
	resonanceIds?: string[];
}

/**
 * 武器（状態付き）
 */
export interface WeaponWithStatus extends Weapon, ItemStatableWithOutBlessed, Countable {}

/**
 * 盾
 */
export interface Shield extends Item {
	type: 'shield';

	/**
	 * 防御力
	 */
	defense: number;

	/**
	 * 印数
	 */
	runeCount: number;

	/**
	 * +1の場合の買値の増加
	 */
	plusBuyPrice: number;

	/**
	 * +1の場合の売値の増加
	 */
	plusSellPrice: number;

	/**
	 * 共鳴する武器
	 */
	resonanceIds?: string[];
}

/**
 * 盾（状態付き）
 */
export interface ShieldWithStatus extends Shield, ItemStatableWithOutBlessed, Countable {}

/**
 * 腕輪
 */
export interface Bracelet extends Item {
	type: 'bracelet';
}

/**
 * 腕輪（状態付き）
 */
export interface BraceletWithStatus extends Bracelet, ItemStatableWithOutBlessed {}

/**
 * 矢
 */
export interface Arrow extends Item {
	type: 'arrow';
}

export interface ArrowWithStatus extends Arrow, Countable, ItemStatableWithOutBlessed {}

/**
 * 岩
 */
export interface Rock extends Item {
	type: 'rock';
}

export interface RockWithStatus extends Rock, Countable, ItemStatableWithOutBlessed {}

/**
 * 食料
 */
export interface Food extends Item {
	type: 'food';
}

/**
 * 食料（状態付き）
 */
export interface FoodWithStatus extends Food, ItemStatable {}

/// 草
export interface Grass extends Item {
	type: 'grass';
}

/**
 * 草（状態付き）
 */
export interface GrassWithStatus extends Grass, ItemStatable {}

/**
 * 巻物
 */
export interface Scroll extends Item {
	type: 'scroll';
}

/**
 * 巻物（状態付き）
 */
export interface ScrollWithStatus extends Scroll, ItemStatable {}

/**
 * 杖
 */
export interface Staff extends Item {
	type: 'staff';

	/**
	 * +1の場合の買値の増加
	 */
	plusBuyPrice: number;

	/**
	 * +1の場合の売値の増加
	 */
	plusSellPrice: number;

	/**
	 * 拾える最大+値
	 * TODO: データがそろったらundefinedを許容しないようにする
	 */
	maxPlusForPickup?: number;

	/**
	 * 最大+値
	 * TODO: データがそろったらundefinedを許容しないようにする
	 */
	maxPlus?: number;
}

/**
 * 杖（状態付き）
 */
export interface StaffWithStatus extends Staff, Countable, ItemStatableWithOutBlessed {}

/**
 * お香
 */
export interface Incense extends Item {
	type: 'incense';

	/**
	 * +1の場合の買値の増加
	 */
	plusBuyPrice: number;

	/**
	 * +1の場合の売値の増加
	 */
	plusSellPrice: number;

	/**
	 * 拾える最大+値
	 * TODO: データがそろったらundefinedを許容しないようにする
	 */
	maxPlusForPickup?: number;

	/**
	 * 最大+値
	 * TODO: データがそろったらundefinedを許容しないようにする
	 */
	maxPlus?: number;
}

/**
 * お香（状態付き）
 */
export interface IncenseWithStatus extends Incense, Countable, ItemStatableWithOutBlessed {}

/**
 * 壺
 */
export interface Pot extends Item {
	type: 'pot';

	/**
	 * +1の場合の買値の増加
	 */
	plusBuyPrice: number;

	/**
	 * +1の場合の売値の増加
	 */
	plusSellPrice: number;

	/**
	 * 拾える最大+値
	 * TODO: データがそろったらundefinedを許容しないようにする
	 */
	maxPlusForPickup?: number;

	/**
	 * 最大+値
	 * TODO: データがそろったらundefinedを許容しないようにする
	 */
	maxPlus?: number;
}

/**
 * 壺（状態付き）
 */
export interface PotWithStatus extends Pot, Countable, ItemStatableWithOutBlessed {}

export type ItemKind =
	| Weapon
	| Shield
	| Bracelet
	| Arrow
	| Rock
	| Food
	| Grass
	| Scroll
	| Staff
	| Incense
	| Pot;

export type ItemKindWithStatus =
	| WeaponWithStatus
	| ShieldWithStatus
	| BraceletWithStatus
	| ArrowWithStatus
	| RockWithStatus
	| FoodWithStatus
	| GrassWithStatus
	| ScrollWithStatus
	| StaffWithStatus
	| IncenseWithStatus
	| PotWithStatus;
