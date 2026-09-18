---
title: Database 1 - Systems, Models, and SQL
date: 2026-09-10 14:00:00
categories: COMS W4111 Introduction to Databases
tags:
  - Database Systems
  - Relational Model
  - SQL
mathjax: true
cover: "/images/coms-w4111-introduction-to-databases.jpg"
excerpt: "Why database systems exist, how data moves from requirements to relations, and how keys, declarative SQL, and NULL semantics establish a reliable relational foundation."
lesson_number: 1
lesson_level: 1
study_time: 22
---

Welcome - pull up a chair. This first database blog begins with a question that sounds almost too simple: **why not keep data in ordinary files?** A file can certainly store names, courses, salaries, or transactions. The difficulty begins when several applications must share those facts, several users update them at the same time, and the system must remain correct after a crash.

That is the setting in which a database management system becomes useful. We will first understand the problem a DBMS solves, then follow data through the four design phases, and finally build the relational vocabulary needed for keys and SQL.

> **Course snapshot.** COMS W4111 uses PostgreSQL. Course materials, the syllabus, and assignment portals are hosted at [dbcourse.app](https://dbcourse.app/) and require the Columbia Google account. For this meeting, the course quiz and HW1 opening were scheduled for September 17, 2026. The teaching team is Prof. Oktie Hassanzadeh and four TAs; asking for help early matters because later design decisions build on the vocabulary introduced here.

## What a DBMS Does

A **database management system (DBMS)** is software that manages interrelated data and mediates between applications and physical storage. Applications ask the DBMS to define, retrieve, modify, protect, and recover data; they do not manipulate disk blocks directly.

This division of responsibility gives us several services at once:

- **Data definition:** schemas declare which tables, attributes, and constraints exist.
- **Data manipulation:** a common query language reads and changes data.
- **Integrity:** shared rules are checked for every application.
- **Concurrency:** transactions coordinate operations from simultaneous users.
- **Recovery:** logs and recovery protocols restore a valid state after failure.
- **Administration and security:** access can be controlled at a finer level than an entire file.

The important word is *system*. A database is not merely a collection of tables; the DBMS is the machinery that keeps those tables meaningful while the surrounding world changes.

## Why Plain Files Break Down

Suppose a university stores student contact information in one advising file, one billing file, and one course-registration file. The same email address now appears three times. If a student changes it and only two applications update their copies, the university has three files but no single trustworthy answer.

That example exposes the first failure mode, but not the last:

1. **Redundancy and inconsistency.** Repeated facts drift apart when updates do not reach every copy.
2. **Difficult access.** Every new question requires another parser or application program.
3. **Integrity and atomicity problems.** Business rules are duplicated in application code, and a crash halfway through a multi-step update can leave only part of the change recorded.
4. **Concurrent-access anomalies.** Two operations can read the same old value and overwrite one another. Two simultaneous withdrawals, for example, may both approve themselves against the same balance.
5. **Security problems.** File permissions are usually all-or-nothing; they do not naturally express that one role may read a table but not a sensitive column or particular rows.

| Concern | Files plus application code | DBMS responsibility |
| --- | --- | --- |
| Schema | Hidden inside programs | Declared and enforced |
| New question | Write another program | Write a declarative query |
| Integrity | Reimplemented by each app | Declared once and checked for all writes |
| Concurrency | Ad hoc locking | Transaction-based isolation |
| Crash recovery | Manual or unreliable | Automated, log-based recovery |
| Access control | Usually file-level | Table-, column-, and row-level policies |

### Data Independence

The deeper benefit is **data independence**. An application states *what* information it needs without specifying the exact disk blocks, indexes, or join algorithm used to find it. The DBMS may add an index, reorganize pages, or choose a different execution plan without forcing the application query to change.

> **Key idea:** separating the logical request from the physical retrieval strategy lets a database evolve internally while preserving the interface seen by applications.

## Data Categories and Models

Database architecture depends heavily on **variety**, one of the familiar five Vs of data: volume, velocity, variety, veracity, and value. Variety asks how consistently records share a structure.

- **Structured data** follows a fixed schema chosen before data arrives. A relational table with a known set of columns is the standard example.
- **Semi-structured data** carries structure with each record. JSON and XML documents can have named fields even when every record is not identical.
- **Unstructured data** has no internal structure that an ordinary database query can directly use, such as free text, images, or audio.

A **data model** is a collection of conceptual tools for describing data, relationships, semantics, and constraints. Two models are central here:

- The **entity-relationship model** is a design language. It helps us reason about the domain before committing to tables.
- The **relational model** represents data as relations, implemented by relational database systems.

An ER diagram is therefore not usually the final production database. It is a conceptual bridge from a real domain to a relational schema.

## The Database Design Pipeline

A reliable database is designed in stages because each stage answers a different question.

### Requirements Analysis

First, identify what users need to store and what questions or operations the system must support. The output is a characterization of the data needs, not yet a table design.

### Conceptual Design

Next, identify entities, relationships, attributes, and constraints. The output is a model-independent ER diagram that explains the domain without committing to PostgreSQL details.

### Logical Design

The conceptual model is translated into relations and attributes. This phase produces the relational schema and includes two distinct decisions:

1. **Business decision:** which facts about the organization should be recorded at all?
2. **Computer-science decision:** how should those facts be grouped into tables so that redundancy and anomalies are controlled? This is where normalization enters.

### Physical Design

Only after the logical structure is stable do we choose indexes, partitioning, storage layouts, and other physical details. These choices should respond to measured workloads rather than guesses.

> **Design order:** requirements tell us what matters; the conceptual model tells us what exists; the logical model tells us how facts are represented; physical design tells us how the chosen representation will run efficiently.

## Relations, Tuples, and Domains

In Ted Codd's relational model, information is represented by mathematical relations.

- A **relation** is represented as a table.
- A row is a **tuple**.
- A column is an **attribute**.
- An attribute's **domain** is the set of values it is permitted to take.
- A **schema** describes the logical structure, while an **instance** is the collection of tuples present at one particular moment.

For example,

$$
\text{instructor}(\text{ID},\text{name},\text{dept\_name},\text{salary})
$$

is a schema. The current instructor rows form one instance of that schema.

### Atomic Domains

An attribute should contain an **atomic** value: one value at the level at which the database needs to query it. If a single column stores `Ferguson, Donald, F`, every query that needs only the family name must parse a formatting convention. Likewise, packing a department and course number into `COMSW4111` makes both validation and searching harder.

Atomic does not mean “physically indivisible.” It means the value is not treated as a bundle of separately meaningful fields by this database design.

### Relations Are Unordered

A relation is an unordered set of tuples. A table display may happen to look sorted because of an index or insertion history, but that order is not part of the relational result. If order matters, a query must request it explicitly.

## Keys and Referential Integrity

Keys express identity and connect relations.

- A **superkey** is any attribute set $K\subseteq R$ that uniquely identifies every tuple in every legal instance of relation $R$.
- A **candidate key** is a minimal superkey: removing any attribute would destroy uniqueness.
- A **primary key** is the candidate key selected as the relation's principal identifier.
- A **foreign key** is an attribute set in one relation whose non-NULL values must match a candidate or primary key in another relation.

The foreign-key rule is **referential integrity**. It prevents a registration row, for example, from referring to a student who does not exist.

Foreign keys are checked on `INSERT`, `UPDATE`, and `DELETE`. They may be `NULL` when the design permits the absence of a reference. When a referenced row is deleted, the schema must choose a policy:

1. **Restrict or reject:** refuse the deletion while referencing rows remain.
2. **Cascade:** delete the referencing rows automatically.
3. **Set NULL:** preserve those rows but remove the reference.

### Natural and Surrogate Keys

A **natural key** originates in the domain, such as an email address. It is descriptive but may change. A **surrogate key** is a system-assigned identifier, such as a UNI or CUID. It carries little business meaning but can remain stable.

Primary keys should usually be immutable. A changing key forces updates through every foreign key that refers to it, whereas an immutable surrogate isolates identity from changing descriptive facts.

## Declarative SQL

SQL is a declarative language: we describe the desired result, not the sequence of disk and memory operations used to produce it. PostgreSQL's query optimizer examines statistics, relation sizes, indexes, and available algorithms to choose an execution plan.

A basic single-table query has three main clauses:

```sql
SELECT attribute_list
FROM relation
WHERE tuple_predicate;
```

`SELECT` chooses output attributes, `FROM` identifies the input relation, and `WHERE` keeps only tuples satisfying the predicate.

### Duplicates and Ordering

Unlike mathematical relational algebra, SQL keeps duplicate result rows by default. Use `SELECT DISTINCT` when duplicates must be removed.

SQL also makes no default ordering promise. Use an explicit clause such as:

```sql
ORDER BY salary DESC;
```

### NULL and Three-Valued Logic

`NULL` represents an unknown or inapplicable value. It is neither zero nor an empty string. A comparison involving `NULL` usually produces `UNKNOWN`, so SQL predicates use three truth values: `TRUE`, `FALSE`, and `UNKNOWN`.

A `WHERE` clause keeps a row only when its predicate evaluates to `TRUE`. Therefore neither `grade = NULL` nor `grade <> 'A'` selects a row whose grade is `NULL`. Test missingness explicitly:

```sql
WHERE grade IS NULL
```

or

```sql
WHERE grade IS NOT NULL
```

## The Foundation We Built

The first meeting gives us a complete conceptual spine. A DBMS replaces fragmented file logic with shared schemas, constraints, transactions, security, and recovery. Requirements become a conceptual model, then a relational schema, and only then a physical implementation. Within that schema, atomic domains give attributes meaning, keys give tuples identity, foreign keys protect relationships, and declarative SQL lets the optimizer choose how to retrieve the requested result.

The next blog moves from this foundation into ER notation, cardinality, relational algebra, and joins.

*Cover photo: [Pierre Blaché on Unsplash](https://unsplash.com/photos/statue-of-liberty-and-manhattan-skyline-VMNG8BYFQfs), free to use under the [Unsplash License](https://unsplash.com/license).*

<section class="article-attachments" aria-label="Article attachments">
  <div class="article-attachments__heading">
    <span class="article-attachments__heading-icon"><i class="fa-solid fa-paperclip" aria-hidden="true"></i></span>
    <div>
      <span class="article-attachments__eyebrow">COURSE FILES</span>
      <p class="article-attachments__title">Attachments</p>
      <p class="article-attachments__description">Download the original three-page Week 1 notes for offline review.</p>
    </div>
  </div>
  <div class="article-attachments__list">
    <article class="article-attachment">
      <span class="article-attachment__icon"><i class="fa-regular fa-file-pdf" aria-hidden="true"></i></span>
      <div class="article-attachment__info">
        <strong>COMS W4111 - Week 1 Notes</strong>
        <span>PDF <b>·</b> 3 pages <b>·</b> 135 KB</span>
      </div>
      <a class="article-attachment__download" href="/blog/files/coms-w4111-database-week-1-notes.pdf" download="COMS-W4111-Database-Week-1-Notes.pdf">
        <i class="fa-solid fa-download" aria-hidden="true"></i>
        <span>Download PDF</span>
      </a>
    </article>
  </div>
</section>
