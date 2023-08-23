const { Shop, Item } = require("../src/gilded_rose.js");

describe("Gilded Rose", function () {
  it("full test", () => {
    const items = [
      new Item("+5 Dexterity Vest", 10, 20),
      new Item("Aged Brie", 2, 0),
      new Item("Elixir of the Mongoose", 5, 7),
      new Item("Sulfuras, Hand of Ragnaros", 0, 80),
      new Item("Sulfuras, Hand of Ragnaros", -1, 80),
      new Item("Backstage passes to a TAFKAL80ETC concert", 15, 20),
      new Item("Backstage passes to a TAFKAL80ETC concert", 10, 49),
      new Item("Backstage passes to a TAFKAL80ETC concert", 5, 39),
      new Item("Conjured Mana Cake", 3, 6),
    ];

    const days = Number(process.argv[2]) || 2;
    const gildedRose = new Shop(items);

    for (let day = 0; day < days; day++) {
      console.log(`\n-------- day ${day} --------`);
      console.log("name, sellIn, quality");
      items.forEach((item) =>
        console.log(`${item.name}, ${item.sellIn}, ${item.quality}`)
      );
      gildedRose.updateQuality();
    }
  });

  it("Aged Brie quality increases by 1 when sellIn--", () => {
    const items = [new Item("Aged Brie", 6, 10)];
    const gildedRose = new Shop(items);
    gildedRose.updateQuality();
    expect(items[0].quality).toBe(11);
  });

  it("Backstage passes quality increases by 3 when sellIn < 5", () => {
    const items = [new Item("Backstage passes", 3, 10)];
    const gildedRose = new Shop(items);
    gildedRose.updateQuality();
    expect(items[0].quality).toBe(13);
  });

  it("Backstage passes quality increases by 2 when 5 < sellIn < 10", () => {
    const items = [new Item("Backstage passes", 6, 10)];
    const gildedRose = new Shop(items);
    gildedRose.updateQuality();
    expect(items[0].quality).toBe(12);
  });

  it("Backstage passes quality increases by 1 when sellIn--", () => {
    const items = [new Item("Backstage passes", 24, 10)];
    const gildedRose = new Shop(items);
    gildedRose.updateQuality();
    expect(items[0].quality).toBe(11);
  });

  it("Backstage passes quality = 0 after concert", () => {
    const items = [new Item("Backstage passes", -1, 20)];
    const gildedRose = new Shop(items);
    gildedRose.updateQuality();
    expect(items[0].quality).toBe(0);
  });

  it("Default item decreases by 1 when sellIn--", () => {
    const items = [new Item("Cabbage", 3, 10)];
    const gildedRose = new Shop(items);
    gildedRose.updateQuality();
    expect(items[0].quality).toBe(9);
  });

  it("Default item decreases by 2 when sellIn < 0", () => {
    const items = [new Item("Cabbage", -2, 10)];
    const gildedRose = new Shop(items);
    gildedRose.updateQuality();
    expect(items[0].quality).toBe(8);
  });

  it("Quality never goes past 50", () => {
    const items = [new Item("Aged Brie", 3, 50)];
    const gildedRose = new Shop(items);
    gildedRose.updateQuality();
    expect(items[0].quality).toBe(50);
  });

  it("Quality never negative", () => {
    const items = [new Item("Celery", 2, 0)];
    const gildedRose = new Shop(items);
    gildedRose.updateQuality();
    expect(items[0].quality).toBe(0);
  });

  it("Sulfuras quality always 80 and sellIn is null", () => {
    const items = [new Item("Sulfuras", 10, 80)];
    const gildedRose = new Shop(items);
    gildedRose.updateQuality();
    expect(items[0].quality).toBe(80);
    expect(items[0].sellIn).toBe(null);
  });

  it("Quality of Conjured item decreases by 2 (twice as fast as default)", () => {
    const items = [new Item("Conjured Cabbage", 10, 30)];
    const gildedRose = new Shop(items);
    gildedRose.updateQuality();
    expect(items[0].quality).toBe(28);
  });

  it("Quality of Conjured item decreases 4 (twice as fast as default (sellIn expired))", () => {
    const items = [new Item("Conjured Cabbage", -2, 10)];
    const gildedRose = new Shop(items);
    gildedRose.updateQuality();
    expect(items[0].quality).toBe(6);
  });
});
