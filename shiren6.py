#!python3

import itertools
import csv
import textwrap
from dataclasses import dataclass
from typing import Iterable
import io

OUTPUT_DIR = "src/lib/item/"
OUTPUT_PATH_WEAPON = OUTPUT_DIR + "weapon.ts"
OUTPUT_PATH_SHIELD = OUTPUT_DIR + "shield.ts"
OUTPUT_PATH_BRACELET = OUTPUT_DIR + "bracelet.ts"
OUTPUT_PATH_ARROW = OUTPUT_DIR + "arrow.ts"
OUTPUT_PATH_ROCK = OUTPUT_DIR + "rock.ts"
OUTPUT_PATH_FOOD = OUTPUT_DIR + "food.ts"
OUTPUT_PATH_GRASS = OUTPUT_DIR + "grass.ts"
OUTPUT_PATH_SCROLL = OUTPUT_DIR + "scroll.ts"
OUTPUT_PATH_STAFF = OUTPUT_DIR + "staff.ts"
OUTPUT_PATH_INCENSE = OUTPUT_DIR + "incense.ts"
OUTPUT_PATH_POT = OUTPUT_DIR + "pot.ts"


@dataclass
class CsvItem:
    id: str
    name: str
    type_: str
    buy_price: int
    sell_price: int
    power: int | None
    rune_count: int | None
    identification_status: str
    resonance: str
    min_plus_for_pickup: int | None
    max_plus_for_pickup: int | None
    plus_buy_price: int | None
    plus_sell_price: int | None
    rune_effect_for_weapon: str | None
    rune_effect_for_shield: str | None
    description: str


def to_ts_resonances(resonances: list["Resonance"] | None) -> str:
    if resonances is None or len(resonances) == 0:
        return ""
    else:
        value = "\n        " + "\n        ".join(
            [x.to_ts_resonance() for x in resonances]
        )
        return f"resonanceIds: [{value}\n    ],"


def to_ts_description(description: str) -> str:
    if description == "" or description is None:
        return ""
    else:
        return f"description: '{description}',"


@dataclass
class Weapon:
    id: str
    name: str
    buy_price: int
    sell_price: int
    power: int
    rune_count: int
    identification_status: str
    resonances: list[str] | None
    plus_buy_price: int
    plus_sell_price: int
    rune_effect_for_weapon: str | None
    description: str

    @staticmethod
    def from_csv_item(item: CsvItem) -> "Weapon":
        return Weapon(
            id=item.id,
            name=item.name,
            buy_price=item.buy_price,
            sell_price=item.sell_price,
            power=item.power,
            rune_count=item.rune_count,
            identification_status=item.identification_status,
            resonances=(
                None
                if item.resonance == "" or item.resonance is None
                else item.resonance.split(" ")
            ),
            plus_buy_price=item.plus_buy_price,
            plus_sell_price=item.plus_sell_price,
            rune_effect_for_weapon=item.rune_effect_for_weapon,
            description=item.description,
        )

    def to_ts(self, shields: Iterable["Shield"]):
        resonances = (
            None
            if self.resonances is None
            else [Resonance.from_(resonance, shields) for resonance in self.resonances]
        )
        return f"""
{{
    id: "{self.id}",
    type: "weapon",
    name: "{self.name}",
    attack: {self.power},
    runeCount: {self.rune_count},
    buyPrice: {self.buy_price},
    sellPrice: {self.sell_price},
    plusBuyPrice: {self.plus_buy_price},
    plusSellPrice: {self.plus_sell_price},
    identificationStatus: "{self.identification_status}",
    {to_ts_resonances(resonances)}
    {to_ts_description(self.description)}
}}
""".strip()


@dataclass
class Shield:
    id: str
    name: str
    buy_price: int
    sell_price: int
    power: int
    rune_count: int
    identification_status: str
    resonances: list[str] | None
    plus_buy_price: int
    plus_sell_price: int
    rune_effect_for_shield: str | None
    description: str

    @staticmethod
    def from_csv_item(item: CsvItem) -> "Shield":
        return Shield(
            id=item.id,
            name=item.name,
            buy_price=item.buy_price,
            sell_price=item.sell_price,
            power=item.power,
            rune_count=item.rune_count,
            identification_status=item.identification_status,
            resonances=(
                None
                if item.resonance == "" or item.resonance is None
                else item.resonance.split(" ")
            ),
            plus_buy_price=item.plus_buy_price,
            plus_sell_price=item.plus_sell_price,
            rune_effect_for_shield=item.rune_effect_for_shield,
            description=item.description,
        )

    def to_ts(self, weapons: Iterable["Weapon"]):
        resonances = (
            None
            if self.resonances is None
            else [Resonance.from_(resonance, weapons) for resonance in self.resonances]
        )
        return f"""
{{
    id: "{self.id}",
    type: "shield",
    name: "{self.name}",
    defense: {self.power},
    runeCount: {self.rune_count},
    buyPrice: {self.buy_price},
    sellPrice: {self.sell_price},
    plusBuyPrice: {self.plus_buy_price},
    plusSellPrice: {self.plus_sell_price},
    identificationStatus: "{self.identification_status}",
    {to_ts_resonances(resonances)}
    {to_ts_description(self.description)}
}}
""".strip()


@dataclass
class Resonance:
    id: str
    name: str

    @staticmethod
    def from_(
        resonance_name: str, shields: Iterable[Shield] | Iterable[Weapon]
    ) -> "Resonance":
        id = None
        for shield in shields:
            if shield.name == resonance_name:
                id = shield.id
                break
        if id is None:
            raise ValueError(f"Resonance {resonance_name} not found")
        return Resonance(id=id, name=resonance_name)

    def to_ts_resonance(self) -> str:
        return f"'{self.id}', // {self.name}"


@dataclass
class Bracelet:
    id: str
    name: str
    identification_status: str
    buy_price: int
    sell_price: int
    description: str

    @staticmethod
    def from_csv_item(item: CsvItem) -> "Bracelet":
        return Bracelet(
            id=item.id,
            name=item.name,
            identification_status=item.identification_status,
            buy_price=item.buy_price,
            sell_price=item.sell_price,
            description=item.description,
        )

    def to_ts(self):
        return f"""
{{
    id: "{self.id}",
    type: "bracelet",
    name: "{self.name}",
    buyPrice: {self.buy_price},
    sellPrice: {self.sell_price},
    identificationStatus: "{self.identification_status}",
    {to_ts_description(self.description)}
}}
""".strip()


@dataclass
class Arrow:
    id: str
    name: str
    identification_status: str
    buy_price: int
    sell_price: int
    description: str

    @staticmethod
    def from_csv_item(item: CsvItem) -> "Arrow":
        return Arrow(
            id=item.id,
            name=item.name,
            identification_status=item.identification_status,
            buy_price=item.buy_price,
            sell_price=item.sell_price,
            description=item.description,
        )

    def to_ts(self):
        return f"""
{{
    id: "{self.id}",
    type: "arrow",
    name: "{self.name}",
    buyPrice: {self.buy_price},
    sellPrice: {self.sell_price},
    identificationStatus: "{self.identification_status}",
    {to_ts_description(self.description)}
}}
""".strip()


@dataclass
class Rock:
    id: str
    name: str
    identification_status: str
    buy_price: int
    sell_price: int
    description: str

    @staticmethod
    def from_csv_item(item: CsvItem) -> "Rock":
        return Rock(
            id=item.id,
            name=item.name,
            identification_status=item.identification_status,
            buy_price=item.buy_price,
            sell_price=item.sell_price,
            description=item.description,
        )

    def to_ts(self):
        return f"""
{{
    id: "{self.id}",
    type: "rock",
    name: "{self.name}",
    buyPrice: {self.buy_price},
    sellPrice: {self.sell_price},
    identificationStatus: "{self.identification_status}",
    {to_ts_description(self.description)}
}}
""".strip()


@dataclass
class Food:
    id: str
    name: str
    identification_status: str
    buy_price: int
    sell_price: int
    description: str

    @staticmethod
    def from_csv_item(item: CsvItem) -> "Food":
        return Food(
            id=item.id,
            name=item.name,
            identification_status=item.identification_status,
            buy_price=item.buy_price,
            sell_price=item.sell_price,
            description=item.description,
        )

    def to_ts(self):
        return f"""
{{
    id: "{self.id}",
    type: "food",
    name: "{self.name}",
    buyPrice: {self.buy_price},
    sellPrice: {self.sell_price},
    identificationStatus: "{self.identification_status}",
    {to_ts_description(self.description)}
}}
""".strip()


@dataclass
class Grass:
    id: str
    name: str
    identification_status: str
    buy_price: int
    sell_price: int
    description: str

    @staticmethod
    def from_csv_item(item: CsvItem) -> "Grass":
        return Grass(
            id=item.id,
            name=item.name,
            identification_status=item.identification_status,
            buy_price=item.buy_price,
            sell_price=item.sell_price,
            description=item.description,
        )

    def to_ts(self):
        return f"""
{{
    id: "{self.id}",
    type: "grass",
    name: "{self.name}",
    buyPrice: {self.buy_price},
    sellPrice: {self.sell_price},
    identificationStatus: "{self.identification_status}",
    {to_ts_description(self.description)}
}}
""".strip()


@dataclass
class Scroll:
    id: str
    name: str
    identification_status: str
    buy_price: int
    sell_price: int
    description: str

    @staticmethod
    def from_csv_item(item: CsvItem) -> "Scroll":
        return Scroll(
            id=item.id,
            name=item.name,
            identification_status=item.identification_status,
            buy_price=item.buy_price,
            sell_price=item.sell_price,
            description=item.description,
        )

    def to_ts(self):
        return f"""
{{
    id: "{self.id}",
    type: "scroll",
    name: "{self.name}",
    buyPrice: {self.buy_price},
    sellPrice: {self.sell_price},
    identificationStatus: "{self.identification_status}",
    {to_ts_description(self.description)}
}}
""".strip()


@dataclass
class Staff:
    id: str
    name: str
    identification_status: str
    buy_price: int
    sell_price: int
    plus_buy_price: int
    plus_sell_price: int
    max_plus_for_pickup: int | None
    min_plus_for_pickup: int | None
    description: str

    @staticmethod
    def from_csv_item(item: CsvItem) -> "Staff":
        return Staff(
            id=item.id,
            name=item.name,
            identification_status=item.identification_status,
            buy_price=item.buy_price,
            sell_price=item.sell_price,
            plus_buy_price=item.plus_buy_price,
            plus_sell_price=item.plus_sell_price,
            max_plus_for_pickup=item.max_plus_for_pickup,
            min_plus_for_pickup=item.min_plus_for_pickup,
            description=item.description,
        )

    def to_ts(self):
        return f"""
{{
    id: "{self.id}",
    type: "staff",
    name: "{self.name}",
    buyPrice: {self.buy_price},
    sellPrice: {self.sell_price},
    plusBuyPrice: {self.plus_buy_price},
    plusSellPrice: {self.plus_sell_price},
    identificationStatus: "{self.identification_status}",
    {to_ts_description(self.description)}
}}
""".strip()


@dataclass
class Incense:
    id: str
    name: str
    identification_status: str
    buy_price: int
    sell_price: int
    plus_buy_price: int
    plus_sell_price: int
    max_plus_for_pickup: int | None
    min_plus_for_pickup: int | None
    description: str

    @staticmethod
    def from_csv_item(item: CsvItem) -> "Incense":
        return Incense(
            id=item.id,
            name=item.name,
            identification_status=item.identification_status,
            buy_price=item.buy_price,
            sell_price=item.sell_price,
            plus_buy_price=item.plus_buy_price,
            plus_sell_price=item.plus_sell_price,
            max_plus_for_pickup=item.max_plus_for_pickup,
            min_plus_for_pickup=item.min_plus_for_pickup,
            description=item.description,
        )

    def to_ts(self):
        return f"""
{{
    id: "{self.id}",
    type: "incense",
    name: "{self.name}",
    buyPrice: {self.buy_price},
    sellPrice: {self.sell_price},
    plusBuyPrice: {self.plus_buy_price},
    plusSellPrice: {self.plus_sell_price},
    identificationStatus: "{self.identification_status}",
    {to_ts_description(self.description)}
}}
""".strip()


@dataclass
class Pot:
    id: str
    name: str
    identification_status: str
    buy_price: int
    sell_price: int
    plus_buy_price: int
    plus_sell_price: int
    max_plus_for_pickup: int | None
    min_plus_for_pickup: int | None
    description: str

    @staticmethod
    def from_csv_item(item: CsvItem) -> "Pot":
        return Pot(
            id=item.id,
            name=item.name,
            identification_status=item.identification_status,
            buy_price=item.buy_price,
            sell_price=item.sell_price,
            plus_buy_price=item.plus_buy_price,
            plus_sell_price=item.plus_sell_price,
            max_plus_for_pickup=item.max_plus_for_pickup,
            min_plus_for_pickup=item.min_plus_for_pickup,
            description=item.description,
        )

    def to_ts(self):
        return f"""
{{
    id: "{self.id}",
    type: "pot",
    name: "{self.name}",
    buyPrice: {self.buy_price},
    sellPrice: {self.sell_price},
    plusBuyPrice: {self.plus_buy_price},
    plusSellPrice: {self.plus_sell_price},
    identificationStatus: "{self.identification_status}",
    {to_ts_description(self.description)}
}}
""".strip()


def try_int(s: str, default_value: any = None) -> int:
    try:
        return int(s)
    except ValueError:
        return default_value


def _generate_ts_file_inner(file_path: str, content: str):
    with open(file_path, "w", encoding="utf-8") as f:
        print(
            "// This file is generated by shiren6.py. Do not edit this file directly.",
            file=f,
        )
        print(content, file=f, end="\n")


def generate_ts_file(
    file_path: str,
    items: (
        list[Bracelet]
        | list[Arrow]
        | list[Rock]
        | list[Food]
        | list[Grass]
        | list[Scroll]
        | list[Staff]
        | list[Incense]
        | list[Pot]
    ),
):
    content = io.StringIO()
    camel_class_name = items[0].__class__.__name__
    lower_class_name = camel_class_name.lower()

    # lower_case_name を複数形にする
    if lower_class_name.endswith("s"):
        lower_class_name = lower_class_name + "es"
    else:
        lower_class_name = lower_class_name + "s"

    print(
        f"import type {{ {camel_class_name} }} from './definitions';",
        file=content,
        end="\n\n",
    )
    print(
        f"export const {lower_class_name}: readonly {camel_class_name}[] = [",
        file=content,
    )
    for item in items:
        print(
            textwrap.indent(item.to_ts() + ",", "    "),
            file=content,
        )
    print("];", file=content, end="\n")

    _generate_ts_file_inner(file_path, content.getvalue())


def generate_ts_file_weapon_and_shield(
    weapon_file_path: str,
    weapons: list[Weapon],
    shield_file_path: str,
    shields: list[Shield],
):

    def _generate_ts_file_weapon_and_shield_inner(
        file_path: str,
        items: list[Weapon] | list[Shield],
        resonances: list[Shield] | list[Weapon],
    ):
        content = io.StringIO()
        camel_class_name = items[0].__class__.__name__
        lower_class_name = camel_class_name.lower()

        print(
            f"import type {{ {camel_class_name} }} from './definitions';",
            file=content,
            end="\n\n",
        )

        print(
            f"export const {lower_class_name}s: readonly {camel_class_name}[] = [",
            file=content,
        )

        for item in items:
            print(
                textwrap.indent(item.to_ts(resonances) + ",", "    "),
                file=content,
            )
        print("];", file=content, end="\n")

        _generate_ts_file_inner(file_path, content.getvalue())

    _generate_ts_file_weapon_and_shield_inner(weapon_file_path, weapons, shields)
    _generate_ts_file_weapon_and_shield_inner(shield_file_path, shields, weapons)


def main():
    items: list[CsvItem] = []

    # CSVデータを解析する
    with open("shiren6.csv", "r", encoding="utf-8-sig") as file:
        reader = csv.DictReader(file)

        for row in reader:
            item = CsvItem(
                id=row["id"],
                name=row["name"],
                type_=row["type"],
                buy_price=try_int(row["buyPrice"]),
                sell_price=try_int(row["sellPrice"]),
                power=try_int(row["power"]),
                rune_count=try_int(row["runeCount"]),
                identification_status=row["identification"],
                resonance=row["resonance"],
                min_plus_for_pickup=try_int(row["minPlusForPickup"]),
                max_plus_for_pickup=try_int(row["maxPlusForPickup"]),
                plus_buy_price=try_int(row["plusBuyPrice"]),
                plus_sell_price=try_int(row["plusSellPrice"]),
                rune_effect_for_weapon=(
                    row["runeEffectForWeapon"]
                    if row["runeEffectForWeapon"] != ""
                    else None
                ),
                rune_effect_for_shield=(
                    row["runeEffectForShield"]
                    if row["runeEffectForShield"] != ""
                    else None
                ),
                description=row["description"],
            )

            items.append(item)

    groups = itertools.groupby(items, key=lambda item: item.type_)

    for type_, group in groups:
        match type_:
            case "Weapon":
                weapons = list(group)
            case "Shield":
                shields = list(group)
            case "Bracelet":
                bracelets = list(group)
            case "Arrow":
                arrows = list(group)
            case "Rock":
                rocks = list(group)
            case "Food":
                foods = list(group)
            case "Grass":
                grasses = list(group)
            case "Scroll":
                scrolls = list(group)
            case "Staff":
                staffs = list(group)
            case "Incense":
                incenses = list(group)
            case "Pot":
                pots = list(group)

    generate_ts_file_weapon_and_shield(
        OUTPUT_PATH_WEAPON,
        [Weapon.from_csv_item(item) for item in weapons],
        OUTPUT_PATH_SHIELD,
        [Shield.from_csv_item(item) for item in shields],
    )
    generate_ts_file(
        OUTPUT_PATH_BRACELET, [Bracelet.from_csv_item(item) for item in bracelets]
    )
    generate_ts_file(OUTPUT_PATH_ARROW, [Arrow.from_csv_item(item) for item in arrows])
    generate_ts_file(OUTPUT_PATH_ROCK, [Rock.from_csv_item(item) for item in rocks])
    generate_ts_file(OUTPUT_PATH_FOOD, [Food.from_csv_item(item) for item in foods])
    generate_ts_file(OUTPUT_PATH_GRASS, [Grass.from_csv_item(item) for item in grasses])
    generate_ts_file(
        OUTPUT_PATH_SCROLL, [Scroll.from_csv_item(item) for item in scrolls]
    )
    generate_ts_file(OUTPUT_PATH_STAFF, [Staff.from_csv_item(item) for item in staffs])
    generate_ts_file(
        OUTPUT_PATH_INCENSE, [Incense.from_csv_item(item) for item in incenses]
    )
    generate_ts_file(OUTPUT_PATH_POT, [Pot.from_csv_item(item) for item in pots])


if __name__ == "__main__":
    main()
