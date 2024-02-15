<script lang="ts">
	import Icon from '@iconify/svelte';
	import type { ItemSelectOptions } from './item-select-options';
	import type { ViewItemCategory } from './view-item';

	/// swapボタンの状態
	export let swapChecked: ItemSelectOptions;

	const buySellElementValues: Record<
		'buy' | 'sell',
		{ label: string; icon: string; key: keyof ItemSelectOptions }
	> = {
		buy: { label: '買値', icon: 'mdi:account-arrow-down', key: 'buy' },
		sell: { label: '売値', icon: 'mdi:account-arrow-up', key: 'sell' }
	};

	const statusElementValues: Record<
		'normal' | 'cursed' | 'blessed',
		{ label: string; icon: string; key: keyof ItemSelectOptions }
	> = {
		normal: { label: '通常', icon: 'mdi:group', key: 'normal' },
		cursed: { label: '呪い', icon: 'mdi:skull', key: 'cursed' },
		blessed: { label: '祝福', icon: 'mdi:star', key: 'blessed' }
	};

	const itemElementValues: Record<
		ViewItemCategory,
		{ label: string; icon: string; key: keyof ItemSelectOptions }
	> = {
		weapon: { label: '武器', icon: 'mdi:sword', key: 'weapon' },
		shield: { label: '盾', icon: 'mdi:shield', key: 'shield' },
		bracelet: { label: '腕輪', icon: 'mdi:ring', key: 'bracelet' },
		arrow: { label: '投擲', icon: 'mdi:bow-arrow', key: 'arrow' },
		food: { label: '食料', icon: 'mdi:rice', key: 'food' },
		grass: { label: '草', icon: 'mdi:grass', key: 'grass' },
		scroll: { label: '巻物', icon: 'mdi:scroll-text', key: 'scroll' },
		staff: { label: '杖', icon: 'mdi:staff', key: 'staff' },
		pot: { label: '壺', icon: 'mdi:pot-mix', key: 'pot' }
	};

	const iconSize = '2.5rem';
</script>

<div class="flex flex-row flex-wrap gap-2">
	<!-- 買値, 売値 -->
	<div class="indicator join py-3">
		<span class="badge indicator-item badge-primary indicator-center text-xs">売買</span>
		{#each Object.values(buySellElementValues) as buySell}
			<label class="swap mr-px text-center">
				<input type="checkbox" bind:checked={swapChecked[buySell.key]} />
				<span class="swap-on text-secondary"
					><Icon icon={buySell.icon} width={iconSize} height={iconSize} />
					{buySell.label}
				</span>
				<span class="swap-off"
					><Icon icon={buySell.icon} width={iconSize} height={iconSize} />
					{buySell.label}
				</span>
			</label>
		{/each}
	</div>

	<div class="divider divider-horizontal mx-0"></div>
	<!-- 通常、呪い、祝福 -->
	<div class="indicator join py-3">
		<span class="badge indicator-item badge-primary indicator-center text-xs">状態</span>
		{#each Object.values(statusElementValues) as status}
			<label class="swap mr-px text-center">
				<input type="checkbox" bind:checked={swapChecked[status.key]} />
				<span class="swap-on text-secondary"
					><Icon icon={status.icon} width={iconSize} height={iconSize} />
					{status.label}
				</span>
				<span class="swap-off"
					><Icon icon={status.icon} width={iconSize} height={iconSize} />
					{status.label}
				</span>
			</label>
		{/each}
	</div>

	<div class="divider divider-horizontal mx-0"></div>
	<!--　アイテム  -->
	<div class="indicator join py-3">
		<span class="badge indicator-item badge-primary indicator-center text-xs">アイテム</span>

		{#each Object.values(itemElementValues) as item}
			<label class="swap mr-px text-center">
				<input type="checkbox" bind:checked={swapChecked[item.key]} />
				<span class="swap-on text-secondary"
					><Icon icon={item.icon} width={iconSize} height={iconSize} />
					{item.label}
				</span>
				<span class="swap-off"
					><Icon icon={item.icon} width={iconSize} height={iconSize} />
					{item.label}
				</span>
			</label>
		{/each}
	</div>
</div>
