
"use strict";

// CSCI 201 — Succinct and Compact Data Structures
// in Genomics and Bioinformatics
//
// Main sections and subtabs are generated automatically
// from the lessons array below.

const lessons = [

  // ==================================================
  // 1. INTRODUCTION
  // ==================================================
  {
    id: "intro",
    title: "Introduction",
    description: "Why compact data structures matter when searching genomic sequences.",
    topics: [
      {
        id: "overview",
        title: "Overview",
        html: `
          <div class="mini-label">Start here</div>
          <h2>Why do genomics algorithms need compact indexes?</h2>

          <p class="lead">
            Modern sequencing produces many short DNA reads.
            Mapping those reads back to a large reference genome
            requires efficient searching without excessive memory use.
          </p>

          <div class="callout">
            <p>
              <strong>Learning path:</strong>
              First learn how BWT rearranges a string;
              then use FM-Index to search it;
              finally see how Bowtie and BWA use these ideas
              for DNA read alignment.
            </p>
          </div>

          <h3>What you will learn</h3>
          <p>
            The tutorial separates concepts into short lessons.
            Each key algorithm will have a worked table or
            interactive example so you can check how values change.
          </p>

          <div class="example-grid">
            <div class="example-box">
              <strong>Our teaching string</strong>
              <code>banana$</code>
            </div>
            <div class="example-box">
              <strong>DNA example</strong>
              <code>ACGTACGT$</code>
            </div>
          </div>
        `
      },
      {
        id: "genomics",
        title: "Genomics & Read Mapping",
        html: `
          <div class="mini-label">The real-world problem</div>
          <h2>From DNA reads to reference positions</h2>

          <p>
            DNA sequencing machines produce short sequences called
            <strong>reads</strong>. A read mapper searches a reference
            genome to find where each read may belong.
          </p>

          <p>
            Challenges include the genome's size, many reads
            per experiment, repeated DNA segments, sequencing
            errors, and real biological differences such as
            insertions and deletions.
          </p>

          <div class="callout">
            <p>
              <strong>Important distinction:</strong>
              BWT and FM-Index enable compact string searching.
              Bowtie and BWA are read-alignment programs
              built on related indexing techniques.
            </p>
          </div>
        `
      }
    ]
  },

  // ==================================================
  // 2. BURROWS-WHEELER TRANSFORM
  // ==================================================
  {
    id: "bwt",
    title: "BWT",
    description: "Learn the Burrows–Wheeler Transform from a fully worked example.",
    topics: [
      {
        id: "overview",
        title: "Overview",
        html: `
          <div class="mini-label">Burrows–Wheeler Transform</div>
          <h2>What does BWT do?</h2>

          <p>
            The Burrows–Wheeler Transform rearranges the
            characters of a string. It is
            <strong>reversible</strong> when constructed
            with a unique end marker such as <code>$</code>.
          </p>

          <div class="example-grid">
            <div class="example-box">
              <strong>Original text</strong>
              <code>banana$</code>
            </div>
            <div class="example-box">
              <strong>BWT output (L)</strong>
              <code>annb$aa</code>
            </div>
          </div>

          <p>
            BWT itself does not locate DNA reads.
            Its arrangement of characters enables
            compact indexing and backward-search operations.
          </p>
        `
      },
      {
        id: "rotations",
        title: "Cyclic Rotations",
        html: `
          <div class="mini-label">Interactive BWT Construction</div>
          <h2>Construct BWT Using Cyclic Rotations</h2>

          <p>
            We will transform <code>banana$</code> in three steps:
            generate all cyclic rotations, sort them
            lexicographically, and extract the last character
            of each sorted row.
          </p>

          <div class="callout">
            <p>
              <strong>Remember:</strong>
              The <code>$</code> symbol is a unique end marker
              and is lexicographically smaller than
              <code>a</code>, <code>b</code>, and <code>n</code>.
            </p>
          </div>

          <div class="stepper" id="bwt-rotation-stepper">
            <div
              id="bwt-rotation-output"
              class="stepper-output"
              aria-live="polite">
            </div>

            <div class="stepper-controls">
              <button type="button" class="btn secondary"
                      id="bwt-rotation-prev">
                ← Previous
              </button>

              <button type="button" class="btn"
                      id="bwt-rotation-next">
                Next step →
              </button>

              <button type="button" class="btn secondary"
                      id="bwt-rotation-reset">
                Reset
              </button>

              <span id="bwt-rotation-progress"
                class="lesson-position"></span>
            </div>
        </div>
      `
    },

      {
        id: "suffix-array",
        title: "Suffix Array",
        html: `
          <div class="mini-label">Interactive BWT Construction</div>
          <h2>Construct BWT Using a Suffix Array</h2>

          <p>
            We previously constructed the BWT of
            <code>banana$</code> using cyclic rotations.
            Another method uses a
            <strong>Suffix Array (SA)</strong>.
          </p>

          <p>
            A suffix is a substring that begins at
            a particular position in the original
            string and continues to its end.
            The suffix array records the starting
            positions of suffixes after they have
            been sorted lexicographically.
          </p>

          <div class="callout">
            <p>
              <strong>Remember:</strong>
              We use 0-based indexing throughout.
              A suffix is not a cyclic rotation:
              it does not wrap around to the
              beginning of the string.
            </p>
          </div>

    <h3>BWT Construction Formula</h3>

    <div class="formula">
      L[i] = T[(SA[i] - 1 + n) mod n]
    </div>

    <p>
      Where:
    </p>

    <ul>
      <li><strong>T</strong> = original string</li>
      <li><strong>n</strong> = length of T</li>
      <li><strong>i</strong> = row index in the sorted suffix array</li>
      <li><strong>SA[i]</strong> = original starting position of the suffix</li>
      <li><strong>L[i]</strong> = resulting BWT character</li>
    </ul>

    <div class="stepper" id="suffix-array-stepper">
      <div class="mini-label">
        Interactive Suffix Array Construction
      </div>

      <div id="suffix-array-output"
           class="stepper-output"
           aria-live="polite"></div>

      <div class="stepper-controls">
        <button type="button"
                class="btn secondary"
                id="suffix-array-prev">
          ← Previous
        </button>

        <button type="button"
                class="btn"
                id="suffix-array-next">
          Next step →
        </button>

        <button type="button"
                class="btn secondary"
                id="suffix-array-reset">
          Reset
        </button>

        <span id="suffix-array-progress"
              class="lesson-position"></span>
      </div>
    </div>

    <div class="callout">
      <p>
        <strong>Why use this method?</strong>
        The suffix-array approach avoids storing
        the complete cyclic rotation matrix.
        Efficient suffix-array construction
        algorithms are more suitable for
        large genomic sequences.
      </p>
    </div>
  `
},

{
  id: "inverse",
  title: "Inverse BWT",
  html: `
    <div class="mini-label">Interactive BWT Reversal</div>
    <h2>Reconstruct the Original String</h2>

    <p>
      The Burrows-Wheeler Transform is reversible.
      We can reconstruct the original string
      from its BWT output using
      <strong>Last-to-First (LF) Mapping</strong>.
    </p>

    <div class="example-grid">
      <div class="example-box">
        <strong>BWT input (L)</strong>
        <code>annb$aa</code>
      </div>
      <div class="example-box">
        <strong>Expected original string</strong>
        <code>banana$</code>
      </div>
    </div>

    <h3>LF Mapping Formula</h3>
    <div class="formula">
      LF(i) = C[L[i]] + Occ(L[i], i)
    </div>

    <ul>
      <li><strong>i:</strong> Current row index</li>
      <li><strong>L[i]:</strong> Character at row i of the BWT</li>
      <li><strong>C[c]:</strong> Number of characters smaller than c</li>
      <li><strong>Occ(c,i):</strong> Number of c characters before index i in L</li>
      <li><strong>LF(i):</strong> Next row to visit</li>
    </ul>

    <div class="callout">
      <p>
        <strong>Remember:</strong>
        Start from the row containing the unique
        end marker <code>$</code> in L.
        Recover the characters from right to left.
        We use 0-based indexing.
      </p>
    </div>

    <div class="stepper" id="inverse-bwt-stepper">
      <div class="mini-label">Interactive Inverse BWT</div>

      <div id="inverse-bwt-output"
           class="stepper-output"
           aria-live="polite"></div>

      <div class="stepper-controls">
        <button class="btn secondary"
                id="inverse-bwt-prev">
          ← Previous
        </button>

        <button class="btn"
                id="inverse-bwt-next">
          Next step →
        </button>

        <button class="btn secondary"
                id="inverse-bwt-reset">
          Reset
        </button>

        <span id="inverse-bwt-progress"
              class="lesson-position"></span>
      </div>
    </div>
  `
}
    ]  
  },  

  // ==================================================
  // 3. FM-INDEX
  // ==================================================
  {
    id: "fm-index",
    title: "FM-Index",
    description: "Explore backward searching, rank queries, and locating matches.",
    topics: [
      {
        id: "overview",
        title: "Overview",
        html: `
          <div class="mini-label">Ferragina–Manzini Index</div>
          <h2>Compact substring search using BWT</h2>

          <p>
            The FM-Index combines BWT with supporting counts
            and rank queries, allowing efficient pattern
            searching without storing a full suffix tree.
          </p>

          <div class="example-grid">
            <div class="example-box">
              <strong>F (first column)</strong>
              <code>$aaabnn</code>
            </div>
            <div class="example-box">
              <strong>L (last column)</strong>
              <code>annb$aa</code>
            </div>
          </div>

          <p>
            Our example uses zero-based indices and
            half-open intervals <code>[sp, ep)</code>,
            where <code>ep</code> is excluded.
          </p>
        `
      },
      {
        id: "c-array",
        title: "C Array",
        html: `
          <div class="mini-label">Character blocks</div>
          <h2>What does C[c] mean?</h2>

          <p>
            <code>C[c]</code> counts how many characters
            in the indexed text are lexicographically
            smaller than <code>c</code>.
          </p>

          <p>
            It therefore gives the starting position
            of each character's block in the
            sorted first column <code>F</code>.
          </p>

          <div class="table-wrap">
            <table class="data-table">
              <thead>
                <tr>
                  <th>Character</th>
                  <th>Count in banana$</th>
                  <th>C[c]</th>
                </tr>
              </thead>
              <tbody>
                <tr><td><code>$</code></td><td>1</td><td>0</td></tr>
                <tr><td><code>a</code></td><td>3</td><td>1</td></tr>
                <tr><td><code>b</code></td><td>1</td><td>4</td></tr>
                <tr><td><code>n</code></td><td>2</td><td>5</td></tr>
              </tbody>
            </table>
          </div>
        `
      },
      {
        id: "occ-rank",
        title: "Occ / Rank Function",
        html: `
          <div class="mini-label">Counting in the last column</div>
          <h2>What is Occ(c, i)?</h2>

          <p>
            <code>Occ(c, i)</code> counts occurrences of
            character <code>c</code> in the first
            <code>i</code> characters of the BWT
            last column <code>L</code>.
          </p>

          <p>
            The prefix ends before index <code>i</code>.
          </p>

          <p>
            <span class="code-sequence">
              L = annb$aa
            </span>
          </p>

          <div class="example-grid">
            <div class="example-box">
              <strong>First 4 characters: annb</strong>
              <code>Occ(n, 4) = 2</code>
            </div>
            <div class="example-box">
              <strong>First 5 characters: annb$</strong>
              <code>Occ(a, 5) = 1</code>
            </div>
          </div>

          <div class="callout">
            <p>
              <strong>Do not confuse:</strong>
              Occ/rank is the query.
              Rank checkpoints are one possible way
              to implement that query efficiently.
            </p>
          </div>
        `
      },
      {
        id: "lf",
        title: "LF Mapping",
        html: `
          <div class="mini-label">Connecting F and L</div>
          <h2>LF Mapping</h2>

          <p>
            LF Mapping identifies the corresponding
            row in the first column using information
            from the last column.
          </p>

          <div class="formula">
            LF(i) = C[L[i]] + Occ(L[i], i)
          </div>

          <p>
            For <code>L = annb$aa</code>,
            row <code>i = 5</code> contains
            <code>a</code>.
          </p>

          <p>
            <span class="code-sequence">
              LF(5) = C[a] + Occ(a,5) = 1 + 1 = 2
            </span>
          </p>

          <p>
            The resulting value is a
            <strong>row index</strong>,
            not the character's position
            in the original text.
          </p>
        `
      },
      {
        id: "backward-search",
        title: "Backward Search",
        html: `
          <div class="mini-label">Interactive walkthrough</div>
          <h2>Search for ana in banana$</h2>

          <p>
            The FM-Index reads the pattern from right
            to left and updates a half-open suffix-array
            interval <code>[sp, ep)</code>.
          </p>

          <p>
            If the interval becomes empty,
            there are no exact matches.
          </p>

          <div class="formula">
            sp' = C[c] + Occ(c, sp)<br>
            ep' = C[c] + Occ(c, ep)
          </div>

          <div class="stepper" id="backward-stepper">
            <div class="mini-label">
              Click through the search
            </div>

            <div id="stepper-output"
                 class="stepper-output"
                 aria-live="polite"></div>

            <div class="stepper-controls">
              <button class="btn" id="stepper-next">
                Next step →
              </button>

              <button class="btn secondary"
                      id="stepper-reset">
                Reset
              </button>

              <span id="stepper-progress"
                    class="lesson-position"></span>
            </div>
          </div>

          <p>
            The final interval contains two rows,
            corresponding to matches at text
            positions 1 and 3 (zero-based).
          </p>

          <p>
            Locating those positions requires
            suffix-array information or sampling.
          </p>
        `
      },
      {
        id: "rank-checkpoints",
        title: "Rank Checkpoints",
        html: `
          <div class="mini-label">Space–time trade-off</div>
          <h2>Why store rank checkpoints?</h2>

          <p>
            Repeatedly counting a character from the
            beginning of <code>L</code> can be slow.
          </p>

          <p>
            Instead, we can store character counts
            at selected checkpoints and count only
            the characters between the nearest
            checkpoint and the queried position.
          </p>

          <div class="callout">
            <p>
              <strong>Key difference:</strong>
              <code>Occ(c, i)</code> is the required
              count; checkpoints are stored summaries
              that help answer it.
            </p>
          </div>

          <p>
            We will add a visual checkpoint table
            for <code>L = annb$aa</code>
            in this lesson.
          </p>
        `
      },
      {
        id: "sa-sampling",
        title: "SA Sampling",
        html: `
          <div class="mini-label">Locating occurrences</div>
          <h2>How can we recover the text positions?</h2>

          <p>
            Backward Search returns an interval of
            matching rows, not the original
            starting positions.
          </p>

          <p>
            FM-Index implementations can save selected
            suffix-array values and follow LF steps
            to reconstruct unsampled positions.
          </p>

          <p>
            For <code>banana$</code>:
          </p>

          <p>
            <span class="code-sequence">
              SA = [6, 5, 3, 1, 0, 4, 2]
            </span>
          </p>

          <p>
            If we sample entries whose SA
            <em>values</em> are divisible by 2,
            the sampled rows include
            4 (value 0) and 6 (value 2).
          </p>

          <div class="callout">
            <p>
              <strong>Important:</strong>
              Sampling by SA value is not necessarily
              the same as sampling every second row.
            </p>
          </div>
        `
      },
      {
        id: "complexity",
        title: "Complexity",
        html: `
          <div class="mini-label">Computational trade-offs</div>
          <h2>What does FM-Index cost?</h2>

          <p>
            With constant-time rank queries,
            counting occurrences of a pattern
            of length <code>m</code> takes
            <strong>O(m)</strong> backward-search time.
          </p>

          <p>
            Recovering occurrence positions requires
            additional LF steps when suffix-array
            values are sampled.
          </p>

          <p>
            Sampling reduces index storage but
            can increase the number of steps
            needed to locate a match.
          </p>
        `
      }
    ]
  },

  // ==================================================
  // 4. SUCCINCT DATA STRUCTURES
  // Partner's section — placeholders
  // ==================================================
  {
    id: "succinct",
    title: "Succinct Data Structures",
    description: "Learn how bit vectors and wavelet trees support compact indexing.",
    topics: [
      {
        id: "bit-vectors",
        title: "Succinct Bit Vectors",
        html: `
          <div class="mini-label">Coming soon</div>
          <h2>Succinct Bit Vectors</h2>
          <p>
            This lesson will cover compact bit-vector
            representations and their memory efficiency.
          </p>
        `
      },
      {
        id: "rank-select",
        title: "Rank and Select",
        html: `
          <div class="mini-label">Coming soon</div>
          <h2>Rank and Select Operations</h2>
          <p>
            This lesson will explain rank and select
            operations through worked examples.
          </p>
        `
      },
      {
        id: "wavelet-trees",
        title: "Wavelet Trees",
        html: `
          <div class="mini-label">Coming soon</div>
          <h2>Wavelet Trees</h2>
          <p>
            This lesson will show how wavelet trees
            organize symbols using bit vectors.
          </p>
        `
      }
    ]
  },

  // ==================================================
  // 5. COMPRESSED SUFFIX STRUCTURES
  // Partner's section — placeholders
  // ==================================================
  {
    id: "compressed",
    title: "Compressed Suffix Structures",
    description: "Explore compressed suffix arrays, compressed suffix trees, and their trade-offs.",
    topics: [
      {
        id: "compressed-sa",
        title: "Compressed Suffix Arrays",
        html: `
          <div class="mini-label">Coming soon</div>
          <h2>Compressed Suffix Arrays</h2>
          <p>
            This lesson will explain compressed
            suffix-array representations and
            locating operations.
          </p>
        `
      },
      {
        id: "compressed-st",
        title: "Compressed Suffix Trees",
        html: `
          <div class="mini-label">Coming soon</div>
          <h2>Compressed Suffix Trees</h2>
          <p>
            This lesson will discuss compressed
            suffix-tree structures and navigation.
          </p>
        `
      },
      {
        id: "tradeoffs",
        title: "Space–Time Trade-offs",
        html: `
          <div class="mini-label">Coming soon</div>
          <h2>Space–Time Trade-offs</h2>
          <p>
            This lesson will compare memory
            requirements and query performance.
          </p>
        `
      }
    ]
  },

  // ==================================================
  // 6. APPLICATIONS IN BIOINFORMATICS
  // ==================================================
  {
    id: "applications",
    title: "Applications",
    description: "See how BWT-based indexes support practical DNA read alignment.",
    topics: [
      {
        id: "read-mapping",
        title: "Read Mapping",
        html: `
          <div class="mini-label">Bioinformatics problem</div>
          <h2>How do we map DNA reads?</h2>

          <p>
            Read mapping finds plausible positions
            in a reference genome for short sequences
            obtained from sequencing machines.
          </p>

          <p>
            The task is difficult when the genome
            is long, the number of reads is large,
            or reads contain sequencing errors
            and genetic differences.
          </p>
        `
      },
      {
        id: "bowtie",
        title: "Bowtie",
        html: `
          <div class="mini-label">Langmead et al., 2009</div>
          <h2>Fast alignment with controlled mismatch search</h2>

          <p>
            Original Bowtie builds on a BWT-based index.
            Its quality-aware backtracking considers
            permitted substitutions, and its forward
            and mirror indexes help limit
            excessive backtracking.
          </p>

          <div class="example-grid">
            <div class="example-box">
              <strong>Forward reference</strong>
              <code>ACGTACGT$</code>
            </div>
            <div class="example-box">
              <strong>Mirror reference</strong>
              <code>TGCATGCA$</code>
            </div>
          </div>

          <p>
            Original Bowtie (2009) handles mismatches
            but not gapped alignments.
            Later versions of Bowtie are different
            and should be distinguished.
          </p>
        `
      },
      {
        id: "bwa",
        title: "BWA",
        html: `
          <div class="mini-label">Li and Durbin, 2009</div>
          <h2>Bounded inexact searching with gaps</h2>

          <p>
            Original BWA extends BWT-based searching
            to consider substitutions, insertions,
            and deletions.
          </p>

          <p>
            Its lower-bound array <code>D(i)</code>
            allows the search to prune branches
            that cannot satisfy the remaining
            difference allowance.
          </p>

          <div class="formula">
            If remaining allowance z &lt; D(i),
            prune the branch.
          </div>

          <p>
            We will add the fully worked
            <code>ACGTACGT</code> versus
            <code>ACGACGT</code> example here.
          </p>
        `
      }
    ]
  },

  // ==================================================
  // 7. RESOURCES
  // ==================================================
  {
    id: "resources",
    title: "Resources",
    description: "Find references and links to the project deliverables.",
    topics: [
      {
        id: "references",
        title: "References",
        html: `
          <div class="mini-label">Original research</div>
          <h2>References for further reading</h2>

          <ul>
            <li>
              Burrows and Wheeler (1994),
              <em>A Block-Sorting Lossless
              Data Compression Algorithm</em>.
            </li>

            <li>
              Ferragina and Manzini (2000),
              <em>Opportunistic Data Structures
              with Applications</em>.
            </li>

            <li>
              <a href="https://pmc.ncbi.nlm.nih.gov/articles/PMC2690996/"
                 target="_blank"
                 rel="noopener noreferrer">
                Langmead et al. (2009),
                original Bowtie paper
              </a>.
            </li>

            <li>
              <a href="https://pmc.ncbi.nlm.nih.gov/articles/PMC2705234/"
                 target="_blank"
                 rel="noopener noreferrer">
                Li and Durbin (2009),
                original BWA paper
              </a>.
            </li>
          </ul>

          <p>
            Expand this bibliography to match
            the final research paper before publication.
          </p>
        `
      },
      {
        id: "links",
        title: "Paper & Slides",
        html: `
          <div class="mini-label">Project deliverables</div>
          <h2>Research paper and presentation</h2>

          <p>
            Add the public links to your final
            LaTeX survey paper and PDF slide pack
            once those files are published.
          </p>

          <div class="example-grid">
            <div class="example-box">
              <strong>Survey paper</strong>
              <p>Link to be added</p>
            </div>

            <div class="example-box">
              <strong>Presentation slides</strong>
              <p>Link to be added</p>
            </div>
          </div>
        `
      }
    ]
  }
];

// ==================================================
// NAVIGATION AND RENDERING
// ==================================================

const $ = (id) => document.getElementById(id);

const allTopics = lessons.flatMap((section) =>
  section.topics.map((topic) => ({ section, topic }))
);

function parseHash() {
  const raw = location.hash.replace(/^#\/?/, "");
  const [sectionId, topicId] = raw.split("/");

  const section =
    lessons.find((item) => item.id === sectionId)
    || lessons[0];

  const topic =
    section.topics.find((item) => item.id === topicId)
    || section.topics[0];

  return { section, topic };
}

function setRoute(sectionId, topicId) {
  location.hash = `/${sectionId}/${topicId}`;
}

function buildButton(label, active, className, clickHandler) {
  const button = document.createElement("button");

  button.type = "button";
  button.className =
    `${className}${active ? " active" : ""}`;

  button.textContent = label;

  button.setAttribute(
    "aria-current",
    active ? "page" : "false"
  );

  button.addEventListener("click", clickHandler);

  return button;
}

// ==================================================
// INTERACTIVE FM-INDEX BACKWARD SEARCH
// ==================================================

function initBWTRotationStepper() {
  if (!$('bwt-rotation-stepper')) return;

  const T = 'banana$';

  // Generate every cyclic rotation.
  const rotations = Array.from(
    { length: T.length },
    (_, i) => T.slice(i) + T.slice(0, i)
  );

  // Sort rotations lexicographically.
  const sorted = [...rotations].sort();

  // Extract the last character of each sorted row.
  const L = sorted.map(
    row => row[row.length - 1]
  ).join('');

  function makeTable(rows, isSorted, showLast) {
    const body = rows.map((row, i) => `
      <tr>
        <td>${isSorted ? i : i + 1}</td>
        <td><code>${row}</code></td>
        ${showLast
          ? `<td><code>${row[row.length - 1]}</code></td>`
          : ''}
      </tr>
    `).join('');

    return `
      <div class="table-wrap">
        <table class="data-table">
          <thead>
            <tr>
              <th>${isSorted ? 'Sorted row' : 'Rotation no.'}</th>
              <th>${isSorted ? 'Sorted rotation' : 'Cyclic rotation'}</th>
              ${showLast ? '<th>Last column (L)</th>' : ''}
            </tr>
          </thead>
          <tbody>${body}</tbody>
        </table>
      </div>
    `;
  }

  const phases = [
    {
      title: 'Start: Original String',
      body: `
        <p>
          Our input is <code>${T}</code>, which contains
          7 characters, including the end marker.
        </p>
      `
    },
    {
      title: 'Step 1: Generate All Cyclic Rotations',
      body: `
        <p>
          Move the first character to the end repeatedly.
          Each rotation still contains all 7 characters.
        </p>
        ${makeTable(rotations, false, false)}
      `
    },
    {
      title: 'Step 2: Sort the Rotations',
      body: `
        <p>
          Sort all rotations lexicographically using
          <code>$ &lt; a &lt; b &lt; n</code>.
        </p>
        ${makeTable(sorted, true, false)}
      `
    },
    {
      title: 'Step 3: Extract the Last Column',
      body: `
        <p>
          Read the last character of every sorted
          rotation, from row 0 through row 6.
        </p>

        ${makeTable(sorted, true, true)}

        <div class="callout">
          <p>
            <strong>Final BWT:</strong>
            <code>${L}</code>
          </p>
          <p>
            BWT(<code>${T}</code>) =
            <code>${L}</code>
          </p>
        </div>
      `
    }
  ];

  let step = 0;

  const output = $('bwt-rotation-output');
  const previous = $('bwt-rotation-prev');
  const next = $('bwt-rotation-next');
  const reset = $('bwt-rotation-reset');
  const progress = $('bwt-rotation-progress');

  function showStep() {
    output.innerHTML = `
      <h3>${phases[step].title}</h3>
      ${phases[step].body}
    `;

    previous.disabled = step === 0;
    next.disabled = step === phases.length - 1;

    next.textContent = next.disabled
      ? 'Complete ✓'
      : 'Next step →';

    progress.textContent =
      `Step ${step} of ${phases.length - 1}`;
  }

  previous.addEventListener('click', () => {
    step--;
    showStep();
  });

  next.addEventListener('click', () => {
    step++;
    showStep();
  });

  reset.addEventListener('click', () => {
    step = 0;
    showStep();
  });

  showStep();
}

function initSuffixArrayStepper() {
  if (!$("suffix-array-stepper")) return;

  const T = "banana$";
  const n = T.length;

  // Step 1: Generate all suffixes.
  const suffixes = Array.from(
    { length: n },
    (_, i) => ({
      start: i,
      text: T.slice(i)
    })
  );

  // Step 2: Sort suffixes lexicographically.
  const sorted = [...suffixes].sort((a, b) =>
    a.text < b.text ? -1 :
    a.text > b.text ? 1 : 0
  );

  // Step 3: Construct the suffix array.
  const SA = sorted.map(item => item.start);

  // Step 4: Determine each BWT character.
  const rows = sorted.map((item, i) => {
    const precedingIndex = (item.start - 1 + n) % n;

    return {
      row: i,
      suffix: item.text,
      sa: item.start,
      precedingIndex: precedingIndex,
      character: T[precedingIndex]
    };
  });

  const BWT = rows.map(row => row.character).join("");

  const output = $("suffix-array-output");
  const previous = $("suffix-array-prev");
  const next = $("suffix-array-next");
  const reset = $("suffix-array-reset");
  const progress = $("suffix-array-progress");

  let step = 0;
  const lastStep = n + 3;

  // Table showing the original or sorted suffixes.
  function suffixTable(items, isSorted) {
    return `
      <div class="table-wrap">
        <table class="data-table">
          <thead>
            <tr>
              <th>${isSorted ? "Row i" : "Start index"}</th>
              <th>Suffix</th>
              ${isSorted ? "<th>SA[i]</th>" : ""}
            </tr>
          </thead>
          <tbody>
            ${items.map((item, i) => `
              <tr>
                <td>${isSorted ? i : item.start}</td>
                <td><code>${item.text}</code></td>
                ${isSorted ? `<td>${item.start}</td>` : ""}
              </tr>
            `).join("")}
          </tbody>
        </table>
      </div>
    `;
  }

  // Table showing BWT extraction row by row.
  function extractionTable(revealed, highlightedRow) {
    return `
      <div class="table-wrap">
        <table class="data-table">
          <thead>
            <tr>
              <th>Row i</th>
              <th>Sorted suffix</th>
              <th>SA[i]</th>
              <th>Preceding index</th>
              <th>L[i]</th>
            </tr>
          </thead>
          <tbody>
            ${rows.map(row => `
              <tr ${row.row === highlightedRow
                ? 'style="background:#e9f6f3"'
                : ""}>
                <td>${row.row}</td>
                <td><code>${row.suffix}</code></td>
                <td>${row.sa}</td>
                <td>${row.row < revealed
                  ? row.precedingIndex
                  : "—"}</td>
                <td>${row.row < revealed
                  ? `<code>${row.character}</code>`
                  : "—"}</td>
              </tr>
            `).join("")}
          </tbody>
        </table>
      </div>
    `;
  }

  function showStep() {
    let body = "";

    if (step === 0) {
      body = `
        <h3>Start: Original String</h3>
        <p>
          Our input is <code>${T}</code>.
          It contains <strong>${n} characters</strong>,
          including the unique end marker.
        </p>

        <div class="example-grid">
          <div class="example-box">
            <strong>Original string T</strong>
            <code>${T}</code>
          </div>
          <div class="example-box">
            <strong>Length n</strong>
            <code>${n}</code>
          </div>
        </div>
      `;
    }

    else if (step === 1) {
      body = `
        <h3>Step 1: Generate All Suffixes</h3>

        <p>
          Starting at every position in
          <code>${T}</code>, take the substring
          from that position to the end.
        </p>

        ${suffixTable(suffixes, false)}

        <p>
          Notice that each suffix has a different
          length. Unlike cyclic rotations,
          suffixes do not wrap around.
        </p>
      `;
    }

    else if (step === 2) {
      body = `
        <h3>Step 2: Sort the Suffixes</h3>

        <p>
          Sort the suffixes lexicographically
          using <code>$ &lt; a &lt; b &lt; n</code>.
          Record each suffix's original starting
          position in the suffix array.
        </p>

        ${suffixTable(sorted, true)}

        <div class="callout">
          <p>
            <strong>Suffix Array:</strong>
            <code>SA = [${SA.join(", ")}]</code>
          </p>
        </div>
      `;
    }

    else if (step >= 3 && step < 3 + n) {
      const current = step - 3;
      const row = rows[current];

      body = `
        <h3>Step 3: Calculate BWT Row ${row.row}</h3>

        <p>
          The suffix in sorted row
          <strong>${row.row}</strong> originally
          begins at position
          <strong>${row.sa}</strong>.
        </p>

        <p>
          Find the character immediately
          preceding that position in T.
        </p>

        <div class="formula">
          L[${row.row}] =
          T[(${row.sa} - 1 + ${n}) mod ${n}]
          <br>
          = T[${row.precedingIndex}]
          <br>
          = ${row.character}
        </div>

        ${row.sa === 0 ? `
          <div class="callout">
            <p>
              <strong>Wraparound:</strong>
              Since SA[${row.row}] = 0,
              we take the final character
              of T, which is <code>$</code>.
            </p>
          </div>
        ` : ""}

        ${extractionTable(current + 1, current)}

        <p>
          BWT characters recovered so far:
          <span class="code-sequence">
            ${rows.slice(0, current + 1)
              .map(item => item.character).join("")}
          </span>
        </p>
      `;
    }

    else {
      body = `
        <h3>Final Result: Suffix Array to BWT</h3>

        <p>
          We have calculated the character
          preceding every suffix in sorted order.
        </p>

        ${extractionTable(n, -1)}

        <div class="example-grid">
          <div class="example-box">
            <strong>Suffix Array</strong>
            <code>[${SA.join(", ")}]</code>
          </div>
          <div class="example-box">
            <strong>BWT Output</strong>
            <code>${BWT}</code>
          </div>
        </div>

        <div class="callout">
          <p>
            <strong>Verified:</strong>
            Both cyclic rotations and suffix-array
            construction produce the same result:
            <code>${BWT}</code>.
          </p>
        </div>
      `;
    }

    output.innerHTML = body;

    previous.disabled = step === 0;
    next.disabled = step === lastStep;

    next.textContent = next.disabled
      ? "Complete ✓"
      : "Next step →";

    progress.textContent =
      `Step ${step} of ${lastStep}`;
  }

  previous.addEventListener("click", () => {
    step = Math.max(0, step - 1);
    showStep();
  });

  next.addEventListener("click", () => {
    step = Math.min(lastStep, step + 1);
    showStep();
  });

  reset.addEventListener("click", () => {
    step = 0;
    showStep();
  });

  showStep();
}

function initInverseBWTStepper() {
  if (!$("inverse-bwt-stepper")) return;

  const L = "annb$aa";
  const n = L.length;

  // First column: characters sorted lexicographically.
  const F = [...L].sort().join("");

  // C array for banana$.
  const C = {
    "$": 0,
    "a": 1,
    "b": 4,
    "n": 5
  };

  // Occ(c,i) counts c before position i.
  function Occ(c, i) {
    return [...L.slice(0, i)]
      .filter(character => character === c).length;
  }

  // Begin at the row of the sentinel in L.
  let row = L.indexOf("$");

  // Original text will be reconstructed right to left.
  const recovered = Array(n).fill("?");
  const steps = [];

  for (let position = n - 1; position >= 0; position--) {
    const currentRow = row;
    const character = L[row];

    const cValue = C[character];
    const occValue = Occ(character, row);

    // Calculate LF mapping.
    const nextRow = cValue + occValue;

    recovered[position] = character;

    steps.push({
      row: currentRow,
      character: character,
      position: position,
      cValue: cValue,
      occValue: occValue,
      nextRow: nextRow,
      partial: recovered.join("")
    });

    row = nextRow;
  }

  let step = 0;

  const output = $("inverse-bwt-output");
  const previous = $("inverse-bwt-prev");
  const next = $("inverse-bwt-next");
  const reset = $("inverse-bwt-reset");
  const progress = $("inverse-bwt-progress");

  // Display the first and last BWT columns.
  function makeColumnTable(highlightRow) {
    const body = Array.from({ length: n }, (_, i) => `
      <tr ${i === highlightRow
        ? 'style="background:#e9f6f3"'
        : ""}>
        <td>${i}</td>
        <td><code>${F[i]}</code></td>
        <td><code>${L[i]}</code></td>
      </tr>
    `).join("");

    return `
      <div class="table-wrap">
        <table class="data-table">
          <thead>
            <tr>
              <th>Row i</th>
              <th>First (F)</th>
              <th>Last (L)</th>
            </tr>
          </thead>
          <tbody>${body}</tbody>
        </table>
      </div>
    `;
  }

  function showStep() {
    let html = "";

    if (step === 0) {
      html = `
        <h3>Start: Given BWT String</h3>

        <p>
          We are given <code>L = ${L}</code>.
          Locate the sentinel <code>$</code>,
          which is at row <strong>${L.indexOf("$")}</strong>.
        </p>

        ${makeColumnTable(L.indexOf("$"))}

        <p>
          We will follow LF Mapping and fill the
          original string from right to left.
        </p>

        <div class="formula">
          T = ???????
        </div>
      `;
    } else {
      const state = steps[step - 1];

      html = `
        <h3>Step ${step}: Recover Character</h3>

        <p>
          Current row:
          <strong>${state.row}</strong>.
          The character in L at this row is
          <code>${state.character}</code>.
        </p>

        ${makeColumnTable(state.row)}

        <p>
          Place <code>${state.character}</code>
          at original string position
          <strong>${state.position}</strong>.
        </p>

        <div class="formula">
          LF(${state.row})
          = C[${state.character}]
            + Occ(${state.character}, ${state.row})
          <br>
          = ${state.cValue} + ${state.occValue}
          <br>
          = ${state.nextRow}
        </div>

        <p>
          Next row to visit:
          <strong>${state.nextRow}</strong>
        </p>

        <div class="example-box">
          <strong>Original string recovered so far</strong>
          <span class="code-sequence">
            ${state.partial}
          </span>
        </div>

        ${step === n ? `
          <div class="callout">
            <p>
              <strong>Inverse BWT complete!</strong>
            </p>
            <p>
              Original string:
              <code>${state.partial}</code>
            </p>
          </div>
        ` : ""}
      `;
    }

    output.innerHTML = html;

    previous.disabled = step === 0;
    next.disabled = step === n;

    next.textContent = next.disabled
      ? "Complete ✓"
      : "Next step →";

    progress.textContent = `Step ${step} of ${n}`;
  }

  previous.addEventListener("click", () => {
    step = Math.max(0, step - 1);
    showStep();
  });

  next.addEventListener("click", () => {
    step = Math.min(n, step + 1);
    showStep();
  });

  reset.addEventListener("click", () => {
    step = 0;
    showStep();
  });

  showStep();
}
function initBackwardStepper() {
  const host = $("backward-stepper");

  if (!host) return;

  const steps = [
    {
      char: null,
      interval: "[0, 7)",
      count: 7,
      text:
        "Start with every suffix-array row. " +
        "Pattern: ana. Process right to left."
    },
    {
      char: "a",
      interval: "[1, 4)",
      count: 3,
      text:
        "Process a: sp = C[a] + Occ(a, 0) = 1; " +
        "ep = C[a] + Occ(a, 7) = 4."
    },
    {
      char: "n",
      interval: "[5, 7)",
      count: 2,
      text:
        "Process n: sp = C[n] + Occ(n, 1) = 5; " +
        "ep = C[n] + Occ(n, 4) = 7."
    },
    {
      char: "a",
      interval: "[2, 4)",
      count: 2,
      text:
        "Process a: sp = C[a] + Occ(a, 5) = 2; " +
        "ep = C[a] + Occ(a, 7) = 4. " +
        "Two matches remain."
    }
  ];

  let current = 0;

  const output = $("stepper-output");
  const next = $("stepper-next");
  const reset = $("stepper-reset");
  const progress = $("stepper-progress");

  const renderStep = () => {
    const state = steps[current];

    output.innerHTML = `
      <strong>
        ${state.char === null
          ? "Initial interval"
          : `Character searched: ${state.char}`}
      </strong>
      <br>
      <span class="interval">${state.interval}</span>
      <small>(${state.count} matching rows)</small>
      <p>${state.text}</p>
    `;

    progress.textContent =
      `Step ${current} of ${steps.length - 1}`;

    next.disabled =
      current === steps.length - 1;

    next.textContent =
      current === steps.length - 1
        ? "Complete ✓"
        : "Next step →";
  };

  next.addEventListener("click", () => {
    current = Math.min(
      current + 1,
      steps.length - 1
    );

    renderStep();
  });

  reset.addEventListener("click", () => {
    current = 0;
    renderStep();
  });

  renderStep();
}

// ==================================================
// RENDER THE SELECTED LESSON
// ==================================================

function render() {
  const { section, topic } = parseHash();

  document.title =
    `${topic.title} | ${section.title} | Compact Genomics`;

  $("breadcrumb").textContent =
    `Tutorial / ${section.title} / ${topic.title}`;

  $("lesson-title").textContent =
    topic.title === "Overview"
      ? section.title
      : topic.title;

  $("lesson-description").textContent =
    section.description;

  // Generate main section tabs.
  $("main-tabs").replaceChildren(
    ...lessons.map((item) =>
      buildButton(
        item.title,
        item.id === section.id,
        "main-tab",
        () => setRoute(
          item.id,
          item.topics[0].id
        )
      )
    )
  );

  // Generate subtabs for the selected section.
  $("sub-tabs").replaceChildren(
    ...section.topics.map((item) =>
      buildButton(
        item.title,
        item.id === topic.id,
        "sub-tab",
        () => setRoute(
          section.id,
          item.id
        )
      )
    )
  );

  // Display the selected lesson.
  $("lesson-content").innerHTML = topic.html;

  const current = allTopics.findIndex(
    (item) =>
      item.section.id === section.id &&
      item.topic.id === topic.id
  );

  const next =
    allTopics[(current + 1) % allTopics.length];

  $("lesson-position").textContent =
    `Lesson ${current + 1} of ${allTopics.length}`;

  $("next-lesson").textContent =
    current === allTopics.length - 1
      ? "Back to start ↺"
      : `Next: ${next.topic.title} →`;

  $("next-lesson").href =
    `#/${next.section.id}/${next.topic.id}`;

  // Initialize interactive lessons.
  initBWTRotationStepper();
  initSuffixArrayStepper();
  initInverseBWTStepper();
  initBackwardStepper();
}

// ==================================================
// START WEBSITE
// ==================================================

window.addEventListener("hashchange", render);

if (!location.hash) {
  location.hash = "/intro/overview";
}

render();


window.addEventListener("hashchange", render);
if (!location.hash) location.hash = "/intro/overview";
render();
