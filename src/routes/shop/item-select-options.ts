export interface ItemSelectOptions {
	/**
	 * 購入時価格を対象とするか
	 */
	buy: boolean;
	/**
	 * 売却時価格を対象とするか
	 */
	sell: boolean;

	/**
	 * 通常アイテムを対象とするか
	 */
	normal: boolean;

	/**
	 * 呪われたアイテムを対象とするか
	 */
	cursed: boolean;

	/**
	 * 祝福されたアイテムを対象とするか
	 */
	blessed: boolean;

	/**
	 * 武器を対象とするか
	 */
	weapon: boolean;

	/**
	 * 盾を対象とするか
	 */
	shield: boolean;

	/**
	 * 腕輪を対象とするか
	 */
	bracelet: boolean;

	/**
	 * 投擲武器を対象とするか
	 */
	arrow: boolean;

	/**
	 * 食料を対象とするか
	 */
	food: boolean;

	/**
	 * 草を対象とするか
	 */
	grass: boolean;

	/**
	 * 巻物を対象とするか
	 */
	scroll: boolean;

	/**
	 * 杖を対象とするか
	 */
	staff: boolean;

	/**
	 * 壺を対象とするか
	 */
	pot: boolean;
}
