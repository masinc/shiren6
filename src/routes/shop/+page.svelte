<script lang="ts">
	import { isCountable } from '$lib/item';
	import type { ItemKindWithStatus } from '$lib/item';
	import type { ItemSelectOptions } from './item-select-options';
	import { filterItems } from './filter';
	import { convertToViewItem, type ViewItem, type ViewItemCategory } from './view-item';
	import Header from './Header.svelte';
	import Icon from '@iconify/svelte';

	/// テキストボックスに入力された値
	let inputValue = '';
	/// 入力された金額
	let price: number | null = null;

	/// swapボタンの状態
	let swapChecked: ItemSelectOptions = {
		buy: false,
		sell: false,

		// 通常、呪い、祝福
		normal: false,
		cursed: false,
		blessed: false,

		weapon: false,
		shield: false,
		bracelet: false,
		arrow: false,
		food: false,
		grass: false,
		scroll: false,
		staff: false,
		pot: false
	};

	let viewItems: ViewItem[] = [];

	function sortItem(a: ItemKindWithStatus, b: ItemKindWithStatus): number {
		// 落ちていない数のアイテム数は後ろに持ってくる
		// TODO: 閾値周りは要調整
		if (isCountable(a)) {
			if ((a.count === 0 || a.count > 7) && (!isCountable(b) || (isCountable(b) && b.count < 7))) {
				return 1;
			}
		}
		if (isCountable(b)) {
			if ((b.count === 0 || b.count > 7) && (!isCountable(a) || (isCountable(a) && a.count < 7))) {
				return -1;
			}
		}

		// 識別済みアイテムを後ろに持ってくる
		if (a.identificationStatus === 'always' && b.identificationStatus === 'never') return 1;
		if (a.identificationStatus === 'never' && b.identificationStatus === 'always') return -1;

		// 通常、呪い、祝福の順番に並べる
		if (a.status === 'blessed' && !(b.status === 'blessed')) return 1;
		if (a.status === 'cursed' && b.status === 'normal') return 1;
		if (a.status === 'cursed' && b.status === 'blessed') return -1;
		if (a.status === 'normal' && !(b.status === 'normal')) return -1;

		return 0;
	}

	// swapボタンの状態を元にItemSelectOptionsを生成
	function createItemSelectOptions(swapChecked: ItemSelectOptions): ItemSelectOptions {
		const result = { ...swapChecked };

		// 買値、売値のどちらもチェックされていないときは、両方をtrueにする
		if (!swapChecked.buy && !swapChecked.sell) {
			result.buy = true;
			result.sell = true;
		}

		// 通常、呪い、祝福のどれもチェックされていないときは、全てtrueにする
		if (!swapChecked.normal && !swapChecked.cursed && !swapChecked.blessed) {
			result.normal = true;
			result.cursed = true;
			result.blessed = true;
		}

		// アイテムの種類のどれもチェックされていないときは、全てtrueにする
		if (
			!swapChecked.weapon &&
			!swapChecked.shield &&
			!swapChecked.bracelet &&
			!swapChecked.arrow &&
			!swapChecked.food &&
			!swapChecked.grass &&
			!swapChecked.scroll &&
			!swapChecked.staff &&
			!swapChecked.pot
		) {
			result.weapon = true;
			result.shield = true;
			result.bracelet = true;
			result.arrow = true;
			result.food = true;
			result.grass = true;
			result.scroll = true;
			result.staff = true;
			result.pot = true;
		}

		return result;
	}

	$: {
		try {
			price = Number(inputValue);
			viewItems = filterItems({
				...createItemSelectOptions(swapChecked),
				price
			})
				.sort(sortItem)
				.map(convertToViewItem);
		} catch (e) {
			price = null;
			viewItems = [];
		}
	}

	const itemIcons: Record<ViewItemCategory, string> = {
		weapon: 'mdi:sword',
		shield: 'mdi:shield',
		bracelet: 'mdi:ring',
		arrow: 'mdi:bow-arrow',
		food: 'mdi:rice',
		grass: 'mdi:grass',
		scroll: 'mdi:scroll-text',
		staff: 'mdi:staff',
		pot: 'mdi:pot-mix'
	};
</script>

<div>
	<Header bind:swapChecked />
	<div class="join w-full">
		<input
			type="number"
			placeholder="金額を入力してください"
			class="min-w-xs input input-bordered input-primary w-9/12"
			bind:value={inputValue}
			on:keyup={(e) => {
				if (e.key == 'Escape') {
					inputValue = '';
				}
			}}
		/>

		<button
			class="btn btn-outline"
			on:click={() => {
				inputValue = '';
			}}
		>
			<Icon icon="mdi:clear" width="2rem" height="2rem" />
		</button>
	</div>
</div>

<div class="overflow-auto">
	<table class="table table-sm table-fixed">
		<!-- head -->
		<thead>
			<tr>
				<th class="w-16"></th>
				<th>名称</th>
				<th>買値</th>
				<th>売値</th>
			</tr>
		</thead>
		<tbody>
			{#each viewItems as item}
				<tr>
					<td>
						<div class="flex flex-row">
							<Icon icon={itemIcons[item.category]} width="2.3em" height="2.3em" />
							{#if item.status === 'cursed'}
								<Icon icon="mdi:skull-crossbones" width="1em" height="1em" />
							{:else if item.status === 'blessed'}
								<Icon icon="mdi:star" width="1em" height="1em" />
							{/if}
						</div>
					</td>
					<td>{item.name}</td>
					<td>
						{#if item.buyPrice === price}
							<span class="text-primary">{item.buyPrice}</span>
						{:else}
							{item.buyPrice}
						{/if}
					</td>
					<td>
						{#if item.sellPrice === price}
							<span class="text-primary">{item.sellPrice}</span>
						{:else}
							{item.sellPrice}
						{/if}
					</td>
				</tr>
			{/each}
		</tbody>
	</table>
</div>
