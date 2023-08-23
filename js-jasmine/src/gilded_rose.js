class Item {
  constructor(name, sellIn, quality) {
    this.name = name;
    this.sellIn = sellIn;
    this.quality = quality;
  }
}

class Shop {
  constructor(items = []) {
    this.items = items;
    this.itemRules = {
      Sulfuras: (item) => {
        item.quality = 80;
        item.sellIn = null;
      },
      "Aged Brie": (item) => {
        if (item.quality < 50) {
          item.quality++;
        }
        if (item.quality > 50) {
          item.quality = 50;
        }
        item.sellIn--;
      },
      "Backstage passes": (item) => {
        if (item.sellIn < 0) {
          item.quality = 0;
        } else if (item.sellIn <= 5 && item.quality < 50) {
          item.quality += 3;
        } else if (item.sellIn <= 10 && item.quality < 50) {
          item.quality += 2;
        } else if (item.quality < 50) {
          item.quality++;
        }
        if (item.quality > 50) {
          item.quality = 50;
        }
        item.sellIn--;
      },
      Conjured: (item) => {
        if (item.sellIn < 0) {
          item.quality -= 4;
        } else if (item.sellIn > 0) {
          item.quality -= 2;
        }
        if (item.quality <= 0) {
          item.quality = 0;
        } else if (item.quality > 50) {
          item.quality = 50;
        }
        item.sellIn--;
      },
    };
  }

  updateQuality() {
    for (var i = 0; i < this.items.length; i++) {
      const item = this.items[i];
      const rule =
        this.itemRules[item.name] ||
        (item.name.includes("Conjured")
          ? this.itemRules["Conjured"]
          : undefined) ||
        (item.name.includes("Sulfuras")
          ? this.itemRules["Sulfuras"]
          : undefined) ||
        (item.name.includes("Backstage passes")
          ? this.itemRules["Backstage passes"]
          : undefined) ||
        ((item) => {
          if (item.sellIn < 0) {
            item.quality -= 2;
          } else if (item.sellIn > 0) {
            item.quality--;
          }
          if (item.quality <= 0) {
            item.quality = 0;
          } else if (item.quality > 50) {
            item.quality = 50;
          }
          item.sellIn--;
        });
      rule(item);
    }
  }
}

module.exports = {
  Item,
  Shop,
};
