"use strict";

// Edit the 'lessons' object to expand each section. The tabs are generated
// automatically from the structure below; no framework or server is needed.
const lessons = [
  {
    id: "intro", title: "Introduction", description: "Why compact data structures matter when searching genomic sequences.",
    topics: [
      { id: "overview", title: "Overview", html: `
        <div class="mini-label">Start here</div>
        <h2>Why do genomics algorithms need compact indexes?</h2>
        <p class="lead">Modern sequencing produces many short DNA reads. Mapping those reads back to a large reference genome requires efficient searching without excessive memory use.</p>
        <div class="callout"><p><strong>Learning path:</strong> First learn how BWT rearranges a string; then use FM-Index to search it; finally see how Bowtie and BWA use these ideas for DNA read alignment.</p></div>
        <h3>What you will learn</h3>
        <p>The tutorial separates concepts into short lessons. Each key algorithm will have a worked table or interactive example so you can check how the values change.</p>
        <div class="example-grid"><div class="example-box"><strong>Our teaching string</strong><code>banana$</code></div><div class="example-box"><strong>DNA example</strong><code>ACGTACGT$</code></div></div>` },
      { id: "genomics", title: "Genomics & Read Mapping", html: `
        <div class="mini-label">The real-world problem</div><h2>From DNA reads to reference positions</h2>
        <p>DNA sequencing machines produce short sequences called <strong>reads</strong>. A read mapper searches a reference genome to find where each read may belong.</p>
        <p>Challenges include the genome's size, many reads per experiment, repeated DNA segments, sequencing errors, and real biological differences such as insertions and deletions.</p>
        <div class="callout"><p><strong>Important distinction:</strong> BWT and FM-Index enable compact string searching. Bowtie and BWA are read-alignment programs built on related indexing techniques.</p></div>` }
    ]
  },
  {
    id: "bwt", title: "BWT", description: "Learn the Burrows–Wheeler Transform from a fully worked example.",
    topics: [
      { id: "overview", title: "Overview", html: `
        <div class="mini-label">Burrows–Wheeler Transform</div><h2>What does BWT do?</h2>
        <p>The Burrows–Wheeler Transform rearranges the characters of a string. It is <strong>reversible</strong> when constructed with a unique end marker such as <code>$</code>.</p>
        <div class="example-grid"><div class="example-box"><strong>Original text</strong><code>banana$</code></div><div class="example-box"><strong>BWT output (L)</strong><code>annb$aa</code></div></div>
        <p>BWT itself does not locate DNA reads. Its arrangement of characters enables the compact index and backward-search operations we will study in FM-Index.</p>` },
      { id: "rotations", title: "Cyclic Rotations", html: `
        <div class="mini-label">Worked example</div><h2>Construct BWT from sorted rotations</h2>
        <p>Generate all cyclic rotations of <code>banana$</code>, sort them lexicographically, and read the last character of each sorted row.</p>
        <div class="table-wrap"><table class="data-table"><thead><tr><th>Sorted row</th><th>Cyclic rotation</th><th>Last column (L)</th></tr></thead><tbody>
        <tr><td>0</td><td><code>$banana</code></td><td><code>a</code></td></tr>
        <tr><td>1</td><td><code>a$banan</code></td><td><code>n</code></td></tr>
        <tr><td>2</td><td><code>ana$ban</code></td><td><code>n</code></td></tr>
        <tr><td>3</td><td><code>anana$b</code></td><td><code>b</code></td></tr>
        <tr><td>4</td><td><code>banana$</code></td><td><code>$</code></td></tr>
        <tr><td>5</td><td><code>na$bana</code></td><td><code>a</code></td></tr>
        <tr><td>6</td><td><code>nana$ba</code></td><td><code>a</code></td></tr>
        </tbody></table></div><div class="callout"><p><strong>Result:</strong> BWT(<code>banana$</code>) = <code>annb$aa</code>.</p></div>` },
      { id: "suffix-array", title: "Suffix Array", html: `
        <div class="mini-label">Faster BWT construction</div><h2>Using the suffix array</h2>
        <p>The suffix array records the starting positions of suffixes in lexicographic order. For <code>banana$</code>, using zero-based positions:</p>
        <p><span class="code-sequence">SA = [6, 5, 3, 1, 0, 4, 2]</span></p>
        <p>The preceding character of the suffix at row <code>i</code> gives the BWT entry:</p>
        <div class="formula">L[i] = T[(SA[i] - 1) mod n]</div>
        <p>This yields <code>annb$aa</code>. We will expand this into a complete row-by-row table as we work through the tutorial.</p>` },
      { id: "inverse", title: "Inverse BWT", html: `
        <div class="mini-label">Reversibility</div><h2>Reconstruct the original string</h2>
        <p>Inverse BWT uses the LF mapping to move between rows representing adjacent text positions. Starting from the row containing <code>$</code> in the last column, we repeatedly follow LF.</p>
        <p><span class="code-sequence">4 → 0 → 1 → 5 → 2 → 6 → 3</span></p>
        <div class="callout"><p><strong>Result:</strong> Writing characters in the appropriate reverse order reconstructs <code>banana$</code>.</p></div>` }
    ]
  },
  {
    id: "fm-index", title: "FM-Index", description: "Explore the structures behind backward searching, rank queries, and locating matches.",
    topics: [
      { id: "overview", title: "Overview", html: `
        <div class="mini-label">Ferragina–Manzini Index</div><h2>Compact substring search using BWT</h2>
        <p>The FM-Index combines the BWT with supporting counts and rank queries, allowing the algorithm to search for patterns without storing every occurrence in a full suffix tree.</p>
        <div class="example-grid"><div class="example-box"><strong>F (first column)</strong><code>$aaabnn</code></div><div class="example-box"><strong>L (last column)</strong><code>annb$aa</code></div></div>
        <p>Our example uses zero-based indices and half-open intervals <code>[sp, ep)</code>, where <code>ep</code> is excluded.</p>` },
      { id: "c-array", title: "C Array", html: `
        <div class="mini-label">Character blocks</div><h2>What does C[c] mean?</h2>
        <p><code>C[c]</code> counts how many characters in the indexed text are lexicographically smaller than <code>c</code>. It therefore gives the start of each character's block in the sorted first column <code>F</code>.</p>
        <div class="table-wrap"><table class="data-table"><thead><tr><th>Character</th><th>Count in banana$</th><th>C[c]</th></tr></thead><tbody>
        <tr><td><code>$</code></td><td>1</td><td>0</td></tr><tr><td><code>a</code></td><td>3</td><td>1</td></tr><tr><td><code>b</code></td><td>1</td><td>4</td></tr><tr><td><code>n</code></td><td>2</td><td>5</td></tr>
        </tbody></table></div>` },
      { id: "occ-rank", title: "Occ / Rank Function", html: `
        <div class="mini-label">Counting in the last column</div><h2>What is Occ(c, i)?</h2>
        <p><code>Occ(c, i)</code> counts occurrences of character <code>c</code> in the first <code>i</code> positions of the BWT last column <code>L</code>. Here the prefix ends before index <code>i</code>.</p>
        <p><span class="code-sequence">L = annb$aa</span></p>
        <div class="example-grid"><div class="example-box"><strong>Example: first 4 characters are annb</strong><code>Occ(n, 4) = 2</code></div><div class="example-box"><strong>Example: first 5 characters are annb$</strong><code>Occ(a, 5) = 1</code></div></div>
        <div class="callout"><p><strong>Do not confuse:</strong> Occ/rank is the query. Rank checkpoints are one possible way to implement that query efficiently.</p></div>` },
      { id: "lf", title: "LF Mapping", html: `
        <div class="mini-label">Connecting F and L</div><h2>LF mapping moves to the preceding text character</h2>
        <div class="formula">LF(i) = C[L[i]] + Occ(L[i], i)</div>
        <p>For <code>L = annb$aa</code>, row <code>i = 5</code> contains <code>a</code>. Therefore:</p>
        <p><span class="code-sequence">LF(5) = C[a] + Occ(a,5) = 1 + 1 = 2</span></p>
        <p>The resulting value is a <strong>row index</strong>, not the nucleotide's position in the original text.</p>` },
      { id: "backward-search", title: "Backward Search", html: `
        <div class="mini-label">Interactive walkthrough</div><h2>Search for <code>ana</code> in <code>banana$</code></h2>
        <p>The FM-Index reads the pattern from right to left and updates a half-open suffix-array interval <code>[sp, ep)</code>. If the interval becomes empty, there are no exact matches.</p>
        <div class="formula">sp' = C[c] + Occ(c, sp)<br>ep' = C[c] + Occ(c, ep)</div>
        <div class="stepper" id="backward-stepper"><div class="mini-label">Click through the search</div><div id="stepper-output" class="stepper-output" aria-live="polite"></div><div class="stepper-controls"><button class="btn" id="stepper-next">Next step →</button><button class="btn secondary" id="stepper-reset">Reset</button><span id="stepper-progress" class="lesson-position"></span></div></div>
        <p>The final interval contains two rows, which correspond to matches at text positions 1 and 3 (zero-based). Locating those positions requires suffix-array data or sampling.</p>` },
      { id: "rank-checkpoints", title: "Rank Checkpoints", html: `
        <div class="mini-label">Space–time trade-off</div><h2>Why store rank checkpoints?</h2>
        <p>Repeatedly counting a character from the beginning of <code>L</code> can be slow. Instead, we can store character counts at selected checkpoints and count only the characters between the nearest checkpoint and the queried position.</p>
        <div class="callout"><p><strong>Key difference:</strong> <code>Occ(c, i)</code> is the required count; checkpoints are stored summaries that help answer it.</p></div>
        <p>We will add a visual checkpoint table for <code>L = annb$aa</code> in this lesson.</p>` },
      { id: "sa-sampling", title: "SA Sampling", html: `
        <div class="mini-label">Locating occurrences</div><h2>How can we recover the text positions?</h2>
        <p>Backward Search returns an interval of matching rows, not the original starting positions. FM-Index implementations can save selected suffix-array values and follow LF steps to reconstruct unsampled positions.</p>
        <p>For <code>banana$</code>, <code>SA = [6, 5, 3, 1, 0, 4, 2]</code>. If we sample entries whose SA <em>values</em> are divisible by 2, the sampled rows include 4 (value 0) and 6 (value 2).</p>
        <div class="callout"><p><strong>Important:</strong> Sampling by SA value is not necessarily the same as sampling every second row.</p></div>` },
      { id: "complexity", title: "Complexity", html: `
        <div class="mini-label">Computational trade-offs</div><h2>What does FM-Index cost?</h2>
        <p>With constant-time rank queries, counting occurrences of a pattern of length <code>m</code> takes <strong>O(m)</strong> backward-search time. Recovering occurrence positions requires additional LF steps when suffix-array values are sampled.</p>
        <p>Sampling reduces index storage but can increase the number of steps needed to locate a match.</p>` }
    ]
  },
  {
    id: "applications", title: "Applications", description: "See how BWT-based indexes support practical DNA read alignment.",
    topics: [
      { id: "read-mapping", title: "Read Mapping", html: `
        <div class="mini-label">Bioinformatics problem</div><h2>How do we map DNA reads?</h2>
        <p>Read mapping finds plausible positions in a reference genome for short sequences obtained from sequencing machines. The task is difficult when the genome is long, the number of reads is large, or reads contain sequencing errors and genetic differences.</p>` },
      { id: "bowtie", title: "Bowtie", html: `
        <div class="mini-label">Langmead et al., 2009</div><h2>Fast alignment with controlled mismatch search</h2>
        <p>Original Bowtie builds on a BWT-based index. Its quality-aware backtracking considers permitted substitutions, and its forward and mirror indexes help limit excessive backtracking.</p>
        <div class="example-grid"><div class="example-box"><strong>Forward reference</strong><code>ACGTACGT$</code></div><div class="example-box"><strong>Mirror reference</strong><code>TGCATGCA$</code></div></div>
        <p>Original Bowtie (2009) handles mismatches but not gapped alignments. Later versions of Bowtie are different and should be distinguished.</p>` },
      { id: "bwa", title: "BWA", html: `
        <div class="mini-label">Li and Durbin, 2009</div><h2>Bounded inexact searching with gaps</h2>
        <p>Original BWA extends BWT-based searching to consider substitutions, insertions, and deletions. Its lower-bound array <code>D(i)</code> allows the search to prune branches that cannot satisfy the remaining difference allowance.</p>
        <div class="formula">If remaining allowance z &lt; D(i), prune the branch.</div>
        <p>We will add the fully worked <code>ACGTACGT</code> versus <code>ACGACGT</code> example here.</p>` }
    ]
  },
  {
    id: "resources", title: "Resources", description: "Find research references and links to the accompanying project deliverables.",
    topics: [
      { id: "references", title: "References", html: `
        <div class="mini-label">Selected original research</div><h2>References for further reading</h2>
        <ul><li>Burrows and Wheeler (1994), <em>A Block-Sorting Lossless Data Compression Algorithm</em>.</li>
        <li>Ferragina and Manzini (2000), <em>Opportunistic Data Structures with Applications</em>.</li>
        <li><a href="https://pmc.ncbi.nlm.nih.gov/articles/PMC2690996/" target="_blank" rel="noopener noreferrer">Langmead et al. (2009), original Bowtie paper</a>.</li>
        <li><a href="https://pmc.ncbi.nlm.nih.gov/articles/PMC2705234/" target="_blank" rel="noopener noreferrer">Li and Durbin (2009), original BWA paper</a>.</li></ul>
        <p>Expand this bibliography to match the final paper before publication.</p>` },
      { id: "links", title: "Paper & Slides", html: `
        <div class="mini-label">Project deliverables</div><h2>Research paper and presentation</h2>
        <p>Add the public links to your final LaTeX survey paper (PDF) and slide pack (PDF) once those files are published. These URLs are intentionally left blank so the website never shows fabricated or broken links.</p>
        <div class="example-grid"><div class="example-box"><strong>Survey paper</strong><p>Link to be added</p></div><div class="example-box"><strong>Presentation slides</strong><p>Link to be added</p></div></div>` }
    ]
  }
];

const $ = (id) => document.getElementById(id);
const allTopics = lessons.flatMap((section) => section.topics.map((topic) => ({section, topic})));

function parseHash() {
  const raw = location.hash.replace(/^#\/?/, "");
  const [sectionId, topicId] = raw.split("/");
  const section = lessons.find((item) => item.id === sectionId) || lessons[0];
  const topic = section.topics.find((item) => item.id === topicId) || section.topics[0];
  return { section, topic };
}

function setRoute(sectionId, topicId) {
  location.hash = `/${sectionId}/${topicId}`;
}

function buildButton(label, active, className, clickHandler) {
  const button = document.createElement("button");
  button.type = "button";
  button.className = `${className}${active ? " active" : ""}`;
  button.textContent = label;
  button.setAttribute("aria-current", active ? "page" : "false");
  button.addEventListener("click", clickHandler);
  return button;
}

function initBackwardStepper() {
  const host = $("backward-stepper");
  if (!host) return;
  const steps = [
    {char: null, interval: "[0, 7)", count: 7, text: "Start with every suffix-array row. Pattern: ana. We will process the pattern from right to left."},
    {char: "a", interval: "[1, 4)", count: 3, text: "Process a: sp = C[a] + Occ(a, 0) = 1; ep = C[a] + Occ(a, 7) = 4."},
    {char: "n", interval: "[5, 7)", count: 2, text: "Process n: sp = C[n] + Occ(n, 1) = 5; ep = C[n] + Occ(n, 4) = 7."},
    {char: "a", interval: "[2, 4)", count: 2, text: "Process a: sp = C[a] + Occ(a, 5) = 2; ep = C[a] + Occ(a, 7) = 4. Two matches remain."}
  ];
  let current = 0;
  const output = $("stepper-output");
  const next = $("stepper-next");
  const reset = $("stepper-reset");
  const progress = $("stepper-progress");
  const renderStep = () => {
    const state = steps[current];
    output.innerHTML = `<strong>${state.char === null ? "Initial interval" : `Character searched: ${state.char}`}</strong><br><span class="interval">${state.interval}</span> <small>(${state.count} matching rows)</small><p>${state.text}</p>`;
    progress.textContent = `Step ${current} of ${steps.length - 1}`;
    next.disabled = current === steps.length - 1;
    next.textContent = current === steps.length - 1 ? "Complete ✓" : "Next step →";
  };
  next.addEventListener("click", () => {current = Math.min(current + 1, steps.length - 1);renderStep();});
  reset.addEventListener("click", () => {current = 0;renderStep();});
  renderStep();
}

function render() {
  const { section, topic } = parseHash();
  document.title = `${topic.title} | ${section.title} | Compact Genomics`;
  $("breadcrumb").textContent = `Tutorial / ${section.title} / ${topic.title}`;
  $("lesson-title").textContent = topic.title === "Overview" ? section.title : topic.title;
  $("lesson-description").textContent = section.description;
  $("main-tabs").replaceChildren(...lessons.map((item) => buildButton(item.title, item.id === section.id, "main-tab", () => setRoute(item.id, item.topics[0].id))));
  $("sub-tabs").replaceChildren(...section.topics.map((item) => buildButton(item.title, item.id === topic.id, "sub-tab", () => setRoute(section.id, item.id))));
  $("lesson-content").innerHTML = topic.html;
  const current = allTopics.findIndex((item) => item.section.id === section.id && item.topic.id === topic.id);
  const next = allTopics[(current + 1) % allTopics.length];
  $("lesson-position").textContent = `Lesson ${current + 1} of ${allTopics.length}`;
  $("next-lesson").textContent = current === allTopics.length - 1 ? "Back to start ↺" : `Next: ${next.topic.title} →`;
  $("next-lesson").href = `#/${next.section.id}/${next.topic.id}`;
  initBackwardStepper();
}

window.addEventListener("hashchange", render);
if (!location.hash) location.hash = "/intro/overview";
render();
