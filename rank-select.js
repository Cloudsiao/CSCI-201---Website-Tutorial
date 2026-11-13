"use strict";

function initRankSelect() {
  if (location.hash !== "#/succinct/rank-select") return;

  const lesson = document.getElementById("lesson-content");
  lesson.querySelector(".mini-label").hidden = true;
  lesson.querySelector("p").hidden = true;
  lesson.insertAdjacentHTML("beforeend", `
    <h3>Count a prefix, then find an occurrence</h3>
    <p>Take the seven bits <code>1011010</code>. Their positions run from
      0 to 6. The first five bits are <code>10110</code>, which contain
      three ones. Counting those ones is a rank query:
      <code>rank₁(B, 5) = 3</code>.</p>
    <p>Now find the third one in the whole vector. The ones occur at
      positions 0, 2, 3, and 5, so <code>select₁(B, 3) = 3</code>.</p>
    <div class="callout"><p>Rank takes a prefix length and returns a count.
      Select takes an occurrence number and returns a position.
      Positions start at zero. Occurrence numbers start at one.</p></div>

    <div class="stepper" id="bit-query-demo">
      <h3>Explore the seven bits</h3>
      <p><label for="bit-query-bit">Bit to count or find</label>
        <select id="bit-query-bit"><option value="1">1</option><option value="0">0</option></select></p>
      <p><label for="bit-query-prefix">Prefix length</label>
        <input id="bit-query-prefix" type="range" min="0" max="7" value="5">
        <output id="bit-query-length" for="bit-query-prefix">5</output></p>
      <p><label for="bit-query-occurrence">Occurrence to find in the whole vector</label>
        <select id="bit-query-occurrence"></select></p>
      <div class="table-wrap">
        <table class="data-table">
          <caption>B = 1011010. The prefix excludes position i.</caption>
          <thead><tr><th scope="col">Position</th><th scope="col">Bit</th>
            <th scope="col">Inside prefix?</th><th scope="col">Counted by rank?</th>
            <th scope="col">Selected occurrence?</th></tr></thead>
          <tbody id="bit-query-rows"></tbody>
        </table>
      </div>
      <div id="bit-query-result" class="stepper-output" aria-live="polite"></div>
      <div class="stepper-controls">
        <button type="button" class="btn secondary" id="bit-query-prev">Shorter prefix</button>
        <button type="button" class="btn" id="bit-query-next">Longer prefix</button>
        <button type="button" class="btn secondary" id="bit-query-reset">Reset</button>
      </div>
    </div>

    <h3>Write the queries precisely</h3>
    <p><code>rank_b(B, i)</code> counts bit <code>b</code> before position
      <code>i</code>, for <code>0 ≤ i ≤ n</code>. At <code>i = 0</code>
      the prefix is empty, so the answer is zero. At <code>i = n</code>
      the prefix covers the whole vector.</p>
    <p><code>select_b(B, j)</code> returns the position of the
      <code>j</code>-th occurrence of bit <code>b</code>, where
      <code>1 ≤ j ≤ rank_b(B, n)</code>. There is no fifth one in this
      example, so <code>select₁(B, 5)</code> has no valid result.
      The occurrence menu only offers valid queries.</p>
    <div class="formula">rank₀(B, i) = i − rank₁(B, i)</div>
    <p>Every bit in the prefix is either zero or one. For the first five
      bits, subtract the three ones from five to get two zeros.</p>

    <h3>Connect the count to the index</h3>
    <p>The <a href="#/fm-index/occ-rank">FM-index Occ query</a> uses
      the same prefix convention, but counts a character in the BWT.
      Bit-vector rank counts zeros or ones. Wavelet trees use these
      bit counts to answer character-rank queries.</p>
    <p>This demonstration scans the bits to expose the counting process.
      A scan takes O(n) time in the worst case. It is not a succinct
      rank/select implementation. The
      <a href="#/fm-index/rank-checkpoints">rank-checkpoint lesson</a>
      shows how stored counts reduce the amount scanned.</p>
    <h3>Reference</h3>
    <p>Gonzalo Navarro and Eliana Providel (2012),
      <a href="https://doi.org/10.1007/978-3-642-30850-5_26"
         target="_blank" rel="noopener noreferrer">Fast, Small, Simple Rank/Select on Bitmaps</a>.
      This tutorial uses zero-based positions and excludes the prefix endpoint,
      matching the FM-index lessons.</p>
  `);

  const B = "1011010";
  const bit = document.getElementById("bit-query-bit");
  const prefix = document.getElementById("bit-query-prefix");
  const occurrence = document.getElementById("bit-query-occurrence");
  const previous = document.getElementById("bit-query-prev");
  const next = document.getElementById("bit-query-next");

  function fillOccurrences(j) {
    const n = [...B].filter(b => b === bit.value).length;
    occurrence.replaceChildren();
    for (let k = 1; k <= n; k++) {
      const option = document.createElement("option");
      option.value = k;
      option.textContent = k;
      occurrence.append(option);
    }
    occurrence.value = Math.min(j, n);
  }

  function showQuery() {
    const i = Number(prefix.value);
    const j = Number(occurrence.value);
    let count = 0;
    let seen = 0;
    let position = -1;
    const rows = [];
    for (let k = 0; k < B.length; k++) {
      const matches = B[k] === bit.value;
      if (matches) seen++;
      if (matches && k < i) count++;
      const selected = matches && seen === j;
      if (selected) position = k;
      rows.push(`<tr><th scope="row">${k}</th><td>${B[k]}</td>
        <td>${k < i ? "Yes" : "No"}</td>
        <td>${matches && k < i ? "Yes" : "No"}</td>
        <td>${selected ? "Yes" : "No"}</td></tr>`);
    }
    document.getElementById("bit-query-rows").innerHTML = rows.join("");
    document.getElementById("bit-query-length").textContent = i;
    document.getElementById("bit-query-result").textContent =
      `Prefix: ${B.slice(0, i) || "empty"}. rank_${bit.value}(B, ${i}) = ${count}. ` +
      `select_${bit.value}(B, ${j}) = ${position}. Select searches the whole vector, independently of the prefix.`;
    previous.disabled = i === 0;
    next.disabled = i === B.length;
  }

  bit.addEventListener("change", () => {
    fillOccurrences(Number(occurrence.value));
    showQuery();
  });
  prefix.addEventListener("input", showQuery);
  occurrence.addEventListener("change", showQuery);
  previous.addEventListener("click", () => {
    prefix.value = Number(prefix.value) - 1;
    showQuery();
  });
  next.addEventListener("click", () => {
    prefix.value = Number(prefix.value) + 1;
    showQuery();
  });
  document.getElementById("bit-query-reset").addEventListener("click", () => {
    bit.value = "1";
    prefix.value = "5";
    fillOccurrences(3);
    showQuery();
  });
  fillOccurrences(3);
  showQuery();
}
