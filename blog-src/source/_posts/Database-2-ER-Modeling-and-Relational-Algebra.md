---
title: Database 2 - ER Modeling and Relational Algebra
date: 2026-09-17 14:00:00
categories: COMS W4111 Introduction to Databases
tags:
  - Entity-Relationship Model
  - Relational Algebra
  - SQL Joins
mathjax: true
cover: "/images/coms-w4111-introduction-to-databases.jpg"
excerpt: "A practical bridge from entity-relationship diagrams and cardinality constraints to keys, relational algebra, set semantics, joins, and optimizer freedom."
lesson_number: 2
lesson_level: 1
study_time: 24
---

Welcome back. In the first database blog, we built the vocabulary of relations, keys, and declarative SQL. Now we move one level earlier and one level deeper. Earlier means designing the domain with an entity-relationship model before tables exist; deeper means studying the algebra that explains what relational queries do.

These two views belong together. ER modeling asks, “What objects and relationships must the database preserve?” Relational algebra asks, “Once those facts are relations, how can a query transform them into an answer?”

> **Course snapshot.** HW1 opened on September 17, 2026 and was due September 27 at 11:59 PM. Its four parts were: choose a domain, construct an ER model in a diagram editor, write the explanation, and justify one design decision in five sentences. The next quiz was due September 24 at 7:00 PM. AI tools were allowed and encouraged for drafting or critiquing models, but each write-up needed an AI-usage disclosure.

## Entities, Relationships, and Attributes

An **entity** is a distinguishable object in the modeled world: one particular instructor, student, course, or section. An **entity set** collects entities of the same type that share a common collection of properties.

An **attribute** describes an entity. An instructor might have attributes `ID`, `name`, and `salary`. Some attributes participate in keys; others record descriptive facts.

A **relationship set** associates entities. Formally, an $n$-ary relationship set contains tuples

$$
(e_1,e_2,\ldots,e_n), \qquad e_i\in E_i,
$$

where each $E_i$ is an entity set. The `advisor` relationship, for instance, associates a student entity with an instructor entity.

The distinction matters. An instructor is an object with identity; `advisor` is not another instructor-like object but an association telling us which instructor advises which student.

## Reading ER Diagrams

The textbook ER notation uses a small visual grammar:

- **Rectangles** represent entity sets.
- **Diamonds** represent relationship sets.
- **Ellipses** represent attributes.
- An **underlined attribute** marks a primary key.

A diagram is valuable because it makes decisions visible. If `student` connects to `instructor` through `advisor`, a reader can ask whether every student must have an advisor, whether an instructor may advise many students, and where the relationship's own attributes would live.

### Three Common Notations

| Notation | Main strength | Common setting |
| --- | --- | --- |
| Textbook ER | Precise, with explicit diamond relationships | Silberschatz text and course exams |
| Crow's Foot | Compact cardinalities visible at a glance | Lucidchart, Vertabelo, draw.io, and industry tools |
| UML class diagram | Integrates data structure with software design | Software-engineering teams |

The notation may change, but the domain claim must not. A one-to-many relationship means the same thing whether it appears as a textbook arrow, a Crow's Foot symbol, or a UML multiplicity.

## Cardinality and Optionality

Crow's Foot notation places two pieces of information at each end of a relationship: the minimum permitted participation and the maximum permitted participation.

- `||` means **exactly one**.
- `O|` means **zero or one**: participation is optional but never plural.
- `|<` means **one or more**.
- `O<` means **zero or more**.

Read each end separately. If a relationship says one department has zero or more instructors while every instructor belongs to exactly one department, the two ends express different rules. Combining them gives the full business constraint.

> **Modeling habit:** do not choose a Crow's Foot symbol because it looks plausible. Translate it into a sentence with “must,” “may,” “one,” or “many,” then ask whether every legal real-world situation satisfies that sentence.

## Choosing Keys in Practice

Week 1 distinguished natural and surrogate keys. Here we apply that distinction to realistic university identifiers.

| Key | Kind | Origin | Design implication |
| --- | --- | --- | --- |
| UNI | Surrogate | Assigned by Columbia | Stable, system-generated, no direct business meaning |
| CUID | Surrogate | Assigned on an ID card | Stable system identifier |
| Email | Natural | Fact from the domain | Readable but may change over time |
| `(dept, sec, sem, yr)` | Natural composite | Combined section facts | Uniqueness requires several attributes together |

A **composite key** is not a separate source category; it is simply a key containing more than one attribute. The section example needs several facts because no one component identifies a section across all departments and terms.

### Why Immutability Matters

Suppose email is the primary key for `student`. Every enrollment, advising, and account relation may store that email as a foreign key. Changing one student's address now requires a coordinated update across all those references.

An immutable surrogate key avoids that cascade. The email remains an ordinary attribute that can change, while the student's identity stays fixed.

## Relational Algebra and Closure

Relational algebra is a **procedural query language**: each operator takes one or two relations as input and returns a relation as output. “Procedural” here means an expression describes a sequence of relational transformations, even though a database optimizer may later choose a different physical execution order.

The fact that every result is again a relation is called **closure**. Closure lets us nest expressions. For example,

$$
\pi_{\text{name}}\left(\sigma_{\text{dept\_name}='Physics'}(\text{instructor})\right)
$$

first produces a relation containing Physics instructors and then produces another relation containing only their names. Each intermediate result has a schema and can be inspected independently.

> **Why closure matters:** complex query logic can be built from small, testable transformations because every intermediate answer remains a valid relational input to the next operator.

## Selection and Projection

### Selection Filters Rows

Selection uses the symbol $\sigma$. Given a predicate $P$ and relation $r$,

$$
\sigma_P(r)
$$

returns the tuples of $r$ for which $P$ is true. It corresponds most closely to SQL's `WHERE` clause.

For example,

$$
\sigma_{\text{salary}>80000}(\text{instructor})
$$

returns all instructor tuples with salary above $80{,}000$ while keeping the same attributes.

### Projection Filters Columns

Projection uses the symbol $\pi$:

$$
\pi_{A_1,A_2,\ldots,A_k}(r).
$$

It returns relation $r$ restricted to the listed attributes. Projection changes the schema and may make previously different tuples become identical.

The order “selection and then projection” is common because it narrows relevant rows before producing the final set of attributes, but algebraic equivalences may allow the optimizer to move safe operations.

## Set Semantics and Bag Semantics

Relational algebra uses **set semantics**. A mathematical relation contains no duplicate tuples, so projection automatically removes duplicates. If twelve instructors belong to seven departments,

$$
\pi_{\text{dept\_name}}(\text{instructor})
$$

contains seven department tuples.

SQL normally uses **bag semantics**. The corresponding query

```sql
SELECT dept_name
FROM instructor;
```

returns twelve rows, including repeated department names. To match algebraic projection, write:

```sql
SELECT DISTINCT dept_name
FROM instructor;
```

SQL keeps duplicates by default partly because duplicate elimination requires extra work: the system must sort, hash, or otherwise identify equal result rows.

## Joins as a Relational Pattern

A theta join is defined as a selection over a Cartesian product:

$$
r\bowtie_{\theta}s = \sigma_{\theta}(r\times s).
$$

The Cartesian product pairs every tuple of $r$ with every tuple of $s$. The predicate $\theta$ then keeps only pairs that satisfy the relationship condition. For an instructor and a teaching assignment, that condition might be equality of instructor IDs.

This definition explains both the meaning of the join and the danger of forgetting the predicate: the unfiltered product can be enormous and usually represents combinations that have no domain meaning.

### Optimizer Freedom

The algebra defines the correct result but not one mandatory physical algorithm. A query optimizer may implement the same logical join with:

- a **nested-loop join**,
- a **hash join**, or
- a **sort-merge join**.

The choice depends on relation sizes, indexes, ordering, memory, and statistics. This is another example of data independence: the query expresses the relationship; the DBMS selects the physical strategy.

### SQL Join Syntax

The older comma style writes the product in `FROM` and the join predicate in `WHERE`:

```sql
SELECT *
FROM instructor AS i, teaches AS t
WHERE i.ID = t.ID;
```

The preferred form makes the relationship explicit:

```sql
SELECT *
FROM instructor AS i
JOIN teaches AS t ON i.ID = t.ID;
```

Use `JOIN ... ON` for ordinary joins. It keeps the join condition beside the relations it connects and helps prevent an accidental Cartesian product.

## Practice with RelAX

[RelAX](https://dbis-uibk.github.io/relax/) is an open-source browser calculator for relational algebra. The course uses it with the Silberschatz `UniversityDB` dataset.

A productive practice sequence is:

1. write a selection and inspect its schema;
2. project one or two attributes and observe duplicate elimination;
3. nest selection inside projection;
4. form a join with an explicit predicate;
5. translate the finished expression into SQL and decide whether `DISTINCT` is required.

The goal is not merely to memorize symbols. It is to see a query as a composition of relations and to connect that logical composition with the SQL a DBMS will optimize.

## Connecting Design to Queries

ER modeling and relational algebra solve different parts of one problem. The ER model records which entities and relationships the domain allows. Keys preserve identity after that model becomes relations. Cardinality becomes a combination of keys, foreign keys, uniqueness rules, and sometimes additional constraints. Relational algebra then describes how queries transform those relations, while SQL provides the practical declarative language used by PostgreSQL.

When these layers agree, a query result has a clear meaning. When they disagree, no clever SQL can repair a schema that failed to represent the domain correctly.

*Cover photo: [Pierre Blaché on Unsplash](https://unsplash.com/photos/statue-of-liberty-and-manhattan-skyline-VMNG8BYFQfs), free to use under the [Unsplash License](https://unsplash.com/license).*

<section class="article-attachments" aria-label="Article attachments">
  <div class="article-attachments__heading">
    <span class="article-attachments__heading-icon"><i class="fa-solid fa-paperclip" aria-hidden="true"></i></span>
    <div>
      <span class="article-attachments__eyebrow">COURSE FILES</span>
      <p class="article-attachments__title">Attachments</p>
      <p class="article-attachments__description">Download the original three-page Week 2 notes for offline review.</p>
    </div>
  </div>
  <div class="article-attachments__list">
    <article class="article-attachment">
      <span class="article-attachment__icon"><i class="fa-regular fa-file-pdf" aria-hidden="true"></i></span>
      <div class="article-attachment__info">
        <strong>COMS W4111 - Week 2 Notes</strong>
        <span>PDF <b>·</b> 3 pages <b>·</b> 214 KB</span>
      </div>
      <a class="article-attachment__download" href="/blog/files/coms-w4111-database-week-2-notes.pdf" download="COMS-W4111-Database-Week-2-Notes.pdf">
        <i class="fa-solid fa-download" aria-hidden="true"></i>
        <span>Download PDF</span>
      </a>
    </article>
  </div>
</section>
