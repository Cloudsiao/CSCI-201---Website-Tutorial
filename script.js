
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
            id: "f-l-columns",
            title: "F and L Columns",
            html: `
                <div class="mini-label">FM-Index Main Concepts</div>
                <h2>Understanding the First and Last Columns</h2>

                <p>
                    The FM-Index uses two important columns from the
                    Burrows-Wheeler Transform matrix:
                    the <strong>First Column (F)</strong> and the
                    <strong>Last Column (L)</strong>.
                </p>

                <p>
                    The F column contains the first character of
                    each lexicographically sorted suffix, while
                    the L column contains the character immediately
                    preceding each suffix in the original text,
                    wrapping around when necessary.
                </p>

                <div class="callout">
                    <p>
                        <strong>Remember:</strong>
                        We use the same original string
                        <code>T = banana$</code> and
                        0-based indexing throughout.
                    </p>
                </div>

                <div class="stepper" id="fm-columns-lesson">
                    <div class="mini-label">
                        Interactive F and L Columns
                    </div>

                    <div class="stepper-controls">
                        <button type="button" class="btn"
                                id="fl-show-both">
                            Show Both
                        </button>

                        <button type="button" class="btn secondary"
                                id="fl-show-f">
                            Highlight F
                        </button>

                        <button type="button" class="btn secondary"
                                id="fl-show-l">
                            Highlight L
                        </button>
                    </div>

                    <div id="fm-columns-output"
                         class="stepper-output"
                         aria-live="polite"></div>
                </div>

                <div class="callout">
                    <p>
                        <strong>Why are F and L important?</strong>
                        The FM-Index uses the relationship between
                        these columns to navigate through the
                        indexed sequence without storing the
                        entire BWT matrix.
                    </p>
                </div>
            `
        },

        {
            id: "c-array",
            title: "C Array",
            html: `
                <div class="mini-label">FM-Index Main Concepts</div>
                <h2>Constructing the C Array</h2>

                <p>
                    The C Array tells us how many characters
                    in the original string are
                    <strong>lexicographically smaller</strong>
                    than a given character.
                </p>

                <div class="formula">
                    C[c] = Number of characters smaller than c
                </div>

                <p>
                    We use <code>T = banana$</code> and its
                    sorted first column
                    <code>F = $aaabnn</code>.
                </p>

                <div class="callout">
                    <p>
                        <strong>Remember:</strong>
                        The character order is
                        <code>$ &lt; a &lt; b &lt; n</code>.
                        All row positions use 0-based indexing.
                    </p>
                </div>

                <h3>Interactive C Array Construction</h3>

                <p>
                    Follow each step to calculate the number
                    of smaller characters and identify where
                    each character's block begins in F.
                </p>

                <div class="stepper" id="c-array-stepper">

                    <div id="c-array-output"
                         class="stepper-output"
                         aria-live="polite"></div>

                    <div class="stepper-controls">
                        <button type="button"
                                class="btn secondary"
                                id="c-array-prev">
                            ← Previous
                        </button>

                        <button type="button"
                                class="btn"
                                id="c-array-next">
                            Next step →
                        </button>

                        <button type="button"
                                class="btn secondary"
                                id="c-array-reset">
                            Reset
                        </button>

                        <span id="c-array-progress"
                              class="lesson-position"></span>
                    </div>
                </div>

                <div class="callout">
                    <p>
                        <strong>Why is the C Array important?</strong>
                        C[c] identifies the starting row of
                        character c in the sorted first column.
                        The FM-Index uses this value together
                        with Occ(c, i) to perform backward
                        searching.
                    </p>
                </div>
            `
        },
        {
            id: "occ-rank",
            title: "Occ / Rank Function",
            html: `
                <div class="mini-label">FM-Index Main Concepts</div>
                <h2>Understanding Occ and Rank</h2>

                <p>
                    The <strong>Occ function</strong> counts
                    how many times a character appears in a
                    prefix of the BWT's last column.
                </p>

                <div class="formula">
                    Occ(c, i) = Number of c characters in L[0:i]
                </div>

                <ul>
                    <li>
                        <strong>c:</strong>
                        Character we want to count.
                    </li>
                    <li>
                        <strong>i:</strong>
                        Prefix length, from 0 to n.
                    </li>
                    <li>
                        <strong>L:</strong>
                        Last column of the BWT.
                    </li>
                    <li>
                        <strong>Occ(c, i):</strong>
                        Number of occurrences of c
                        before position i.
                    </li>
                </ul>

                <div class="callout">
                    <p>
                        <strong>Important:</strong>
                        We use 0-based indexing.
                        The prefix L[0:i] excludes
                        position i itself.
                    </p>

                    <p>
                        In this tutorial, rank and Occ
                        use the same exclusive-prefix
                        counting convention.
                    </p>
                </div>

                <h3>Interactive Occ / Rank Calculation</h3>

                <p>
                    Use the controls to examine the BWT
                    positions and calculate Occ values
                    one step at a time.
                </p>

                <div class="stepper" id="occ-rank-stepper">

                    <div id="occ-rank-output"
                         class="stepper-output"
                         aria-live="polite"></div>

                    <div class="stepper-controls">
                        <button type="button"
                                class="btn secondary"
                                id="occ-rank-prev">
                            ← Previous
                        </button>

                        <button type="button"
                                class="btn"
                                id="occ-rank-next">
                            Next step →
                        </button>

                        <button type="button"
                                class="btn secondary"
                                id="occ-rank-reset">
                            Reset
                        </button>

                        <span id="occ-rank-progress"
                              class="lesson-position"></span>
                    </div>
                </div>

                <div class="callout">
                    <p>
                        <strong>Why is Occ important?</strong>
                        The FM-Index combines Occ(c, i)
                        with C[c] to update the search
                        interval during backward search.
                    </p>
                </div>
            `
        },

        {
            id: "lf",
            title: "LF Mapping",
            html: `
                <div class="mini-label">FM-Index Main Concepts</div>
                <h2>Understanding LF Mapping</h2>

                <p>
                    <strong>Last-to-First (LF) Mapping</strong>
                    connects a character in the BWT's last
                    column (L) to the corresponding occurrence
                    of that character in the first column (F).
                </p>

                <div class="formula">
                    LF(i) = C[L[i]] + Occ(L[i], i)
                </div>

                <ul>
                    <li>
                        <strong>i:</strong> Current row index.
                    </li>
                    <li>
                        <strong>L[i]:</strong> Character at row i
                        in the BWT's last column.
                    </li>
                    <li>
                        <strong>C[L[i]]:</strong> Starting row
                        of that character's block in F.
                    </li>
                    <li>
                        <strong>Occ(L[i], i):</strong> Number of
                        occurrences before row i in L.
                    </li>
                    <li>
                        <strong>LF(i):</strong> Destination
                        row in F.
                    </li>
                </ul>

                <div class="callout">
                    <p>
                        <strong>Remember:</strong>
                        All row indices are 0-based.
                        Occ excludes position i itself.
                    </p>

                    <p>
                        LF(i) produces a row index,
                        not a position in the original text.
                    </p>
                </div>

                <h3>Interactive LF Mapping</h3>

                <p>
                    Start from the row containing
                    <code>$</code> in L.
                    Follow each LF mapping and examine
                    how C and Occ determine the next row.
                </p>

                <div class="stepper" id="lf-mapping-stepper">

                    <div id="lf-mapping-output"
                         class="stepper-output"
                         aria-live="polite"></div>

                    <div class="stepper-controls">
                        <button type="button"
                                class="btn secondary"
                                id="lf-mapping-prev">
                            ← Previous
                        </button>

                        <button type="button"
                                class="btn"
                                id="lf-mapping-next">
                            Next step →
                        </button>

                        <button type="button"
                                class="btn secondary"
                                id="lf-mapping-reset">
                            Reset
                        </button>

                        <span id="lf-mapping-progress"
                              class="lesson-position"></span>
                    </div>
                </div>

                <div class="callout">
                    <p>
                        <strong>Why is LF Mapping important?</strong>
                        It allows us to navigate between
                        corresponding rows in F and L
                        using only character counts and
                        rank queries.
                    </p>

                    <p>
                        This relationship supports inverse
                        BWT and FM-Index searching.
                    </p>
                </div>
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

function initFMColumnsLesson() {
    if (!$("fm-columns-lesson")) return;

    const T = "banana$";
    const n = T.length;

    // Generate suffixes and record starting positions.
    const suffixes = Array.from(
        { length: n },
        (_, i) => ({
            suffix: T.slice(i),
            start: i
        })
    );

    // Sort suffixes lexicographically.
    const sorted = [...suffixes].sort((a, b) =>
        a.suffix < b.suffix ? -1 :
        a.suffix > b.suffix ? 1 : 0
    );

    // Construct the F and L columns.
    const rows = sorted.map((item, i) => ({
        row: i,
        suffix: item.suffix,
        sa: item.start,
        F: item.suffix[0],
        L: T[(item.start - 1 + n) % n]
    }));

    const F = rows.map(row => row.F).join("");
    const L = rows.map(row => row.L).join("");

    const output = $("fm-columns-output");

    const buttons = {
        both: $("fl-show-both"),
        F: $("fl-show-f"),
        L: $("fl-show-l")
    };

    function showColumns(mode) {
        const tableRows = rows.map(row => {
            const highlightF = mode === "F";
            const highlightL = mode === "L";

            return `
                <tr>
                    <td>${row.row}</td>
                    <td><code>${row.suffix}</code></td>
                    <td>${row.sa}</td>

                    <td style="${highlightF
                        ? 'background:#e9f6f3;font-weight:bold'
                        : ''}">
                        <code>${row.F}</code>
                    </td>

                    <td style="${highlightL
                        ? 'background:#e9f6f3;font-weight:bold'
                        : ''}">
                        <code>${row.L}</code>
                    </td>
                </tr>
            `;
        }).join("");

        let explanation = "";

        if (mode === "F") {
            explanation = `
                <p>
                    <strong>First Column (F):</strong>
                    Take the first character of each sorted
                    suffix. The result is
                    <code>${F}</code>.
                </p>
            `;
        } else if (mode === "L") {
            explanation = `
                <p>
                    <strong>Last Column (L):</strong>
                    Take the character immediately preceding
                    each suffix in the original string.
                    The result is <code>${L}</code>.
                </p>
            `;
        } else {
            explanation = `
                <p>
                    The first and last columns are
                    <code>F = ${F}</code> and
                    <code>L = ${L}</code>.
                </p>
            `;
        }

        output.innerHTML = `
            <div class="table-wrap">
                <table class="data-table">
                    <thead>
                        <tr>
                            <th>Row i</th>
                            <th>Sorted Suffix</th>
                            <th>SA[i]</th>
                            <th>F[i]</th>
                            <th>L[i]</th>
                        </tr>
                    </thead>

                    <tbody>
                        ${tableRows}
                    </tbody>
                </table>
            </div>

            ${explanation}

            <div class="example-grid">
                <div class="example-box">
                    <strong>First Column F</strong>
                    <code>${F}</code>
                </div>

                <div class="example-box">
                    <strong>Last Column L</strong>
                    <code>${L}</code>
                </div>
            </div>
        `;

        Object.entries(buttons).forEach(([key, button]) => {
            const selected = key === mode;

            button.classList.toggle("secondary", !selected);
            button.setAttribute(
                "aria-pressed",
                String(selected)
            );
        });
    }

    buttons.both.addEventListener("click", () => {
        showColumns("both");
    });

    buttons.F.addEventListener("click", () => {
        showColumns("F");
    });

    buttons.L.addEventListener("click", () => {
        showColumns("L");
    });

    showColumns("both");
}

function initCArrayStepper() {
    if (!$("c-array-stepper")) return;

    const T = "banana$";
    const F = [...T].sort().join("");

    // Identify all unique characters in sorted order.
    const alphabet = [...new Set(T)].sort();

    // Count the frequency of each character.
    const frequencies = {};

    alphabet.forEach(character => {
        frequencies[character] = [...T].filter(
            value => value === character
        ).length;
    });

    // Construct the cumulative C Array.
    let runningTotal = 0;

    const entries = alphabet.map(character => {
        const count = frequencies[character];

        const entry = {
            character: character,
            count: count,
            cValue: runningTotal,
            start: runningTotal,
            end: runningTotal + count
        };

        runningTotal += count;

        return entry;
    });

    const output = $("c-array-output");
    const previous = $("c-array-prev");
    const next = $("c-array-next");
    const reset = $("c-array-reset");
    const progress = $("c-array-progress");

    let step = 0;
    const lastStep = entries.length + 1;

    // Display the sorted first column.
    function makeFTable(activeCharacter = null) {
        const rows = [...F].map((character, i) => `
            <tr>
                <td>${i}</td>
                <td><code>${character}</code></td>
                <td>
                    ${character === activeCharacter
                        ? "← Current character block"
                        : ""}
                </td>
            </tr>
        `).join("");

        return `
            <div class="table-wrap">
                <table class="data-table">
                    <thead>
                        <tr>
                            <th>Row i</th>
                            <th>F[i]</th>
                            <th>Observation</th>
                        </tr>
                    </thead>
                    <tbody>
                        ${rows}
                    </tbody>
                </table>
            </div>
        `;
    }

    // Display C Array values recovered so far.
    function makeCTable(revealedCount) {
        const rows = entries.slice(0, revealedCount)
            .map(entry => `
                <tr>
                    <td><code>${entry.character}</code></td>
                    <td>${entry.count}</td>
                    <td>${entry.cValue}</td>
                    <td>[${entry.start}, ${entry.end})</td>
                </tr>
            `).join("");

        return `
            <div class="table-wrap">
                <table class="data-table">
                    <thead>
                        <tr>
                            <th>Character</th>
                            <th>Frequency</th>
                            <th>C[c]</th>
                            <th>Rows in F</th>
                        </tr>
                    </thead>
                    <tbody>
                        ${rows}
                    </tbody>
                </table>
            </div>
        `;
    }

    function showStep() {
        let html = "";

        // Initial step.
        if (step === 0) {
            html = `
                <h3>Start: Examine the First Column</h3>

                <p>
                    Our original text is <code>${T}</code>.
                    Sorting its characters produces
                    <code>F = ${F}</code>.
                </p>

                ${makeFTable()}

                <p>
                    Notice that identical characters
                    appear together in F.
                </p>

                <p>
                    We will calculate where each
                    character's block begins.
                </p>
            `;
        }

        // Calculate C[$], C[a], C[b], and C[n].
        else if (step <= entries.length) {
            const entry = entries[step - 1];

            const smallerEntries = entries.slice(
                0,
                step - 1
            );

            const expression = smallerEntries.length
                ? smallerEntries.map(
                    item => item.count
                ).join(" + ")
                : "0";

            const smallerCharacters = smallerEntries.length
                ? smallerEntries.map(
                    item => `<code>${item.character}</code>`
                ).join(", ")
                : "none";

            html = `
                <h3>Step ${step}: Calculate C[${entry.character}]</h3>

                <p>
                    Current character:
                    <code>${entry.character}</code>
                </p>

                <p>
                    Characters smaller than
                    <code>${entry.character}</code>:
                    ${smallerCharacters}
                </p>

                <p>
                    Add the frequencies of those
                    smaller characters.
                </p>

                <div class="formula">
                    C[${entry.character}]
                    = ${expression}
                    = ${entry.cValue}
                </div>

                <p>
                    The character
                    <code>${entry.character}</code>
                    occurs ${entry.count}
                    time(s) in the text.
                </p>

                <p>
                    Its block in F begins at
                    <strong>row ${entry.start}</strong>
                    and occupies the half-open interval
                    <code>[${entry.start}, ${entry.end})</code>.
                </p>

                ${makeFTable(entry.character)}

                <h3>C Array Constructed So Far</h3>

                ${makeCTable(step)}
            `;
        }

        // Final summary.
        else {
            html = `
                <h3>Final Result: Complete C Array</h3>

                <p>
                    We have calculated the starting row
                    of every character block in F.
                </p>

                ${makeCTable(entries.length)}

                <div class="example-grid">
                    <div class="example-box">
                        <strong>First Column F</strong>
                        <code>${F}</code>
                    </div>

                    <div class="example-box">
                        <strong>C Array</strong>
                        <code>
                            ${entries.map(
                                entry => `C[${entry.character}] = ${entry.cValue}`
                            ).join(", ")}
                        </code>
                    </div>
                </div>

                <div class="callout">
                    <p>
                        <strong>Key observation:</strong>
                        C[c] does not count occurrences
                        of c itself. It counts characters
                        that are smaller than c.
                    </p>
                </div>
            `;
        }

        output.innerHTML = html;

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

function initOccRankStepper() {
    if (!$("occ-rank-stepper")) return;

    const L = "annb$aa";
    const alphabet = ["$", "a", "b", "n"];

    // Occ(c, i) counts c in L[0:i].
    // The character at index i is excluded.
    function Occ(c, i) {
        return [...L.slice(0, i)].filter(
            character => character === c
        ).length;
    }

    const output = $("occ-rank-output");
    const previous = $("occ-rank-prev");
    const next = $("occ-rank-next");
    const reset = $("occ-rank-reset");
    const progress = $("occ-rank-progress");

    let step = 0;
    const lastStep = 5;

    const examples = [
        {
            character: "a",
            index: 5,
            explanation:
                "Only the a at position 0 is counted. " +
                "The a at position 5 is excluded."
        },
        {
            character: "n",
            index: 4,
            explanation:
                "The prefix annb contains two n characters."
        },
        {
            character: "a",
            index: 0,
            explanation:
                "An empty prefix contains no characters."
        }
    ];

    // Show every index and character of L.
    // Positions before i belong to the counted prefix.
    function makePositionTable(i, target = null) {
        const headers = [...L].map((character, index) => `
            <th>${index}</th>
        `).join("");

        const cells = [...L].map((character, index) => {
            const included = index < i;
            const matches = included && character === target;

            return `
                <td style="${included
                    ? 'background:#e9f6f3;'
                    : ''}">
                    <code style="${matches
                        ? 'font-weight:bold;text-decoration:underline;'
                        : ''}">
                        ${character}
                    </code>
                </td>
            `;
        }).join("");

        return `
            <div class="table-wrap">
                <table class="data-table">
                    <thead>
                        <tr>
                            <th>Index</th>
                            ${headers}
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <th>L[i]</th>
                            ${cells}
                        </tr>
                    </tbody>
                </table>
            </div>

            <p>
                The shaded positions are included
                in the counted prefix.
            </p>
        `;
    }

    // Show the exclusive-prefix boundary.
    function makePrefixDisplay(i) {
        const counted = L.slice(0, i);
        const remaining = L.slice(i);

        return `
            <div class="formula">
                <code>${counted || "∅"}</code>
                &nbsp; | &nbsp;
                <code>${remaining || "∅"}</code>
            </div>

            <p>
                Count only the characters to the
                <strong>left</strong> of the separator.
                The separator is not part of L.
            </p>
        `;
    }

    // Construct the complete Occ table.
    function makeRankTable() {
        const rows = Array.from(
            { length: L.length + 1 },
            (_, i) => {
                const prefix = L.slice(0, i);

                return `
                    <tr>
                        <td>${i}</td>
                        <td>
                            <code>${prefix || "∅"}</code>
                        </td>

                        ${alphabet.map(character => `
                            <td>
                                ${Occ(character, i)}
                            </td>
                        `).join("")}
                    </tr>
                `;
            }
        ).join("");

        return `
            <div class="table-wrap">
                <table class="data-table">
                    <thead>
                        <tr>
                            <th>Prefix length i</th>
                            <th>L[0:i]</th>
                            <th>Occ($, i)</th>
                            <th>Occ(a, i)</th>
                            <th>Occ(b, i)</th>
                            <th>Occ(n, i)</th>
                        </tr>
                    </thead>

                    <tbody>
                        ${rows}
                    </tbody>
                </table>
            </div>
        `;
    }

    function showStep() {
        let html = "";

        // Step 0: Introduce L and its positions.
        if (step === 0) {
            html = `
                <h3>Start: Examine the BWT Last Column</h3>

                <p>
                    We are given:
                    <code>L = ${L}</code>
                </p>

                ${makePositionTable(L.length)}

                <p>
                    The positions are numbered
                    from 0 through ${L.length - 1}.
                </p>

                <p>
                    We will count how many times
                    a character appears before
                    a specified position.
                </p>
            `;
        }

        // Steps 1-3: Worked Occ examples.
        else if (step >= 1 && step <= 3) {
            const example = examples[step - 1];

            const c = example.character;
            const i = example.index;
            const answer = Occ(c, i);

            html = `
                <h3>
                    Step ${step}: Calculate Occ(${c}, ${i})
                </h3>

                <p>
                    Count occurrences of
                    <code>${c}</code> in the
                    first <strong>${i}</strong>
                    characters of L.
                </p>

                ${makePositionTable(i, c)}

                ${makePrefixDisplay(i)}

                <div class="formula">
                    Occ(${c}, ${i}) = ${answer}
                </div>

                <div class="callout">
                    <p>${example.explanation}</p>
                </div>
            `;
        }

        // Step 4: Checkpoint at prefix length 4.
        else if (step === 4) {
            const i = 4;

            html = `
                <h3>Step 4: Rank Checkpoint</h3>

                <p>
                    Consider the first four
                    characters of L.
                </p>

                ${makePositionTable(i)}

                ${makePrefixDisplay(i)}

                <p>
                    Count every character type
                    in the prefix
                    <code>${L.slice(0, i)}</code>.
                </p>

                <div class="formula">
                    Occ($, 4) = ${Occ("$", i)}
                    <br>
                    Occ(a, 4) = ${Occ("a", i)}
                    <br>
                    Occ(b, 4) = ${Occ("b", i)}
                    <br>
                    Occ(n, 4) = ${Occ("n", i)}
                </div>

                <p>
                    These prefix counts are the
                    values that a rank data structure
                    can store or recover efficiently.
                </p>
            `;
        }

        // Step 5: Full Occ table.
        else {
            html = `
                <h3>Final Result: Complete Occ Table</h3>

                <p>
                    The complete table gives the
                    occurrence count of every character
                    at each possible prefix length.
                </p>

                ${makeRankTable()}

                <div class="callout">
                    <p>
                        <strong>Verified examples:</strong>
                    </p>

                    <p>
                        Occ(a, 5) = ${Occ("a", 5)}
                        <br>
                        Occ(n, 4) = ${Occ("n", 4)}
                        <br>
                        Occ(a, 0) = ${Occ("a", 0)}
                    </p>
                </div>

                <p>
                    In this demonstration, Occ is
                    calculated by scanning a prefix.
                    A real FM-Index uses rank-support
                    structures to answer these queries
                    without rescanning the entire prefix.
                </p>
            `;
        }

        output.innerHTML = html;

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

function initLFMappingStepper() {
    if (!$("lf-mapping-stepper")) return;

    const L = "annb$aa";
    const n = L.length;

    // The F column is the sorted BWT string.
    const F = [...L].sort().join("");

    // Construct C from the first position
    // of each distinct character in F.
    const C = {};

    for (let i = 0; i < n; i++) {
        if (C[F[i]] === undefined) {
            C[F[i]] = i;
        }
    }

    // Occ(c, i) counts occurrences of c
    // in the first i characters of L.
    function Occ(c, i) {
        return [...L.slice(0, i)].filter(
            character => character === c
        ).length;
    }

    // LF mapping formula.
    function LF(i) {
        const character = L[i];

        return C[character] + Occ(character, i);
    }

    // Construct the complete LF mapping table.
    const mappings = Array.from(
        { length: n },
        (_, i) => ({
            row: i,
            character: L[i],
            cValue: C[L[i]],
            occValue: Occ(L[i], i),
            destination: LF(i)
        })
    );

    // Follow LF starting from the $ row.
    let currentRow = L.indexOf("$");

    const path = [];

    for (let i = 0; i < n; i++) {
        path.push(currentRow);
        currentRow = LF(currentRow);
    }

    const output = $("lf-mapping-output");
    const previous = $("lf-mapping-prev");
    const next = $("lf-mapping-next");
    const reset = $("lf-mapping-reset");
    const progress = $("lf-mapping-progress");

    let step = 0;
    const lastStep = n + 1;

    // Display F and L side by side.
    // Blue highlights the current L row.
    // Green highlights the destination F row.
    function makeFLTable(sourceRow = -1, targetRow = -1) {
        const rows = Array.from({ length: n }, (_, i) => `
            <tr>
                <td>${i}</td>

                <td style="${i === targetRow
                    ? 'background:#e9f6f3;font-weight:bold;'
                    : ''}">
                    <code>${F[i]}</code>
                </td>

                <td style="${i === sourceRow
                    ? 'background:#eaf0ff;font-weight:bold;'
                    : ''}">
                    <code>${L[i]}</code>
                </td>
            </tr>
        `).join("");

        return `
            <div class="table-wrap">
                <table class="data-table">
                    <thead>
                        <tr>
                            <th>Row i</th>
                            <th>F[i]</th>
                            <th>L[i]</th>
                        </tr>
                    </thead>

                    <tbody>
                        ${rows}
                    </tbody>
                </table>
            </div>
        `;
    }

    // Display all LF mapping results.
    function makeMappingTable() {
        const rows = mappings.map(item => `
            <tr>
                <td>${item.row}</td>
                <td><code>${item.character}</code></td>
                <td>${item.cValue}</td>
                <td>${item.occValue}</td>
                <td><strong>${item.destination}</strong></td>
            </tr>
        `).join("");

        return `
            <div class="table-wrap">
                <table class="data-table">
                    <thead>
                        <tr>
                            <th>i</th>
                            <th>L[i]</th>
                            <th>C[L[i]]</th>
                            <th>Occ(L[i], i)</th>
                            <th>LF(i)</th>
                        </tr>
                    </thead>

                    <tbody>
                        ${rows}
                    </tbody>
                </table>
            </div>
        `;
    }

    function showStep() {
        let html = "";

        // Step 0: Introduce the two columns.
        if (step === 0) {
            html = `
                <h3>Start: Compare F and L</h3>

                <p>
                    We are given:
                    <code>L = ${L}</code>
                </p>

                <p>
                    Sorting its characters produces:
                    <code>F = ${F}</code>
                </p>

                ${makeFLTable()}

                <p>
                    Each occurrence of a character in L
                    corresponds to the same-numbered
                    occurrence of that character in F.
                </p>

                <div class="callout">
                    <p>
                        <strong>Starting point:</strong>
                        The unique end marker
                        <code>$</code> appears in L
                        at row <strong>${path[0]}</strong>.
                    </p>
                </div>
            `;
        }

        // Steps 1-7: Calculate one LF mapping at a time.
        else if (step <= n) {
            const i = path[step - 1];
            const character = L[i];

            const cValue = C[character];
            const occValue = Occ(character, i);
            const destination = LF(i);

            const prefix = L.slice(0, i) || "∅";
            const occurrenceNumber = occValue + 1;

            html = `
                <h3>
                    Step ${step}: Calculate LF(${i})
                </h3>

                <p>
                    We are currently at
                    <strong>row ${i}</strong>.
                </p>

                <p>
                    The character at this row is:
                    <code>L[${i}] = ${character}</code>.
                </p>

                ${makeFLTable(i, destination)}

                <p>
                    First, find the starting position
                    of character
                    <code>${character}</code> in F.
                </p>

                <div class="formula">
                    C[${character}] = ${cValue}
                </div>

                <p>
                    Next, count occurrences of
                    <code>${character}</code> before
                    position ${i} in L.
                </p>

                <p>
                    Prefix examined:
                    <code>${prefix}</code>
                </p>

                <div class="formula">
                    Occ(${character}, ${i}) = ${occValue}
                </div>

                <p>
                    Combine the two values:
                </p>

                <div class="formula">
                    LF(${i})
                    = C[${character}]
                    + Occ(${character}, ${i})
                    <br>
                    = ${cValue} + ${occValue}
                    <br>
                    = ${destination}
                </div>

                <div class="callout">
                    <p>
                        <strong>Result:</strong>
                        Row ${i} in L maps to
                        row ${destination} in F.
                    </p>

                    <p>
                        This is occurrence number
                        ${occurrenceNumber} of
                        <code>${character}</code>
                        in both columns.
                    </p>
                </div>

                <p>
                    Rows visited so far:
                    <code>
                        ${path.slice(0, step).join(" → ")}
                        → ${destination}
                    </code>
                </p>
            `;
        }

        // Final step: Show the full mapping.
        else {
            html = `
                <h3>Final Result: Complete LF Mapping</h3>

                <p>
                    We have calculated the destination
                    row for every character in L.
                </p>

                ${makeMappingTable()}

                <h3>LF Navigation Path</h3>

                <div class="formula">
                    ${path.join(" → ")}
                    → ${currentRow}
                </div>

                <p>
                    Starting from the row containing
                    <code>$</code>, LF Mapping
                    visits the other rows and
                    eventually returns to the
                    starting row.
                </p>

                <div class="callout">
                    <p>
                        <strong>Important:</strong>
                        LF(i) gives a row number.
                        It does not directly give
                        the original text position.
                    </p>

                    <p>
                        Inverse BWT uses these row
                        transitions to reconstruct
                        the text, while FM-Index
                        backward search combines
                        C and Occ to update
                        search intervals.
                    </p>
                </div>
            `;
        }

        output.innerHTML = html;

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
  initFMColumnsLesson();
  initCArrayStepper();
  initOccRankStepper();
  initLFMappingStepper();
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
