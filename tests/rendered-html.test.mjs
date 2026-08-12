import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

test("contains the complete Human Operating System test", async () => {
  const [page, layout] = await Promise.all([
    readFile(new URL("../app/page.tsx", import.meta.url), "utf8"),
    readFile(new URL("../app/layout.tsx", import.meta.url), "utf8"),
  ]);

  assert.equal(page.match(/^    section:/gm)?.length, 48);
  assert.equal(page.match(/scale: "[a-z]+"/g)?.length, 192);
  assert.match(page, /Human Operating System — beta/);
  assert.match(page, /Сильные стороны/);
  assert.match(page, /Слепые зоны/);
  assert.match(layout, /Human Operating System — beta-тест/);
  assert.doesNotMatch(page, /Gallup|CliftonStrengths/);
});
