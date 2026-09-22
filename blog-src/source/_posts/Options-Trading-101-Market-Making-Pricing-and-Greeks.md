---
title: Options 101 - Market Making, Pricing, and Greeks
date: 2026-09-21 14:30:00
categories: Options Trading 101
tags:
  - Options
  - Market Making
  - Derivatives
  - Volatility
  - Greeks
mathjax: true
cover: "/images/options-trading-101-cover.svg"
excerpt: "A practical path from two-sided markets and contract mechanics to payoff engineering, put-call parity, volatility, Greeks, and the dynamic hedging loop used to manage an options book."
lesson_number: 1
lesson_level: 1
study_time: 70
---

Welcome - pull up a chair. Options can look like a wall of vocabulary: bid, offer, forward, strike, volatility, delta, gamma, theta, vega. The quickest way through that wall is not to memorize each word separately. It is to follow one question from beginning to end:

> **How can a market maker quote a fair two-sided market, trade around that fair value, and keep the resulting risk under control?**

That question gives the subject a natural order. We first need to understand what is being traded and how a market works. Then we need to describe an option's payoff, connect related contracts through no-arbitrage, estimate a theoretical value, and finally translate a portfolio into risk coordinates that can be hedged. By the end, the formulas should feel like parts of one operating system rather than a collection of exam facts.

This blog reorganizes my Options Trading 101 notes into a single coherent reference. The examples and numbers are newly written to make the reasoning self-contained. It is an educational explanation, not investment advice.

## The Market Maker's Job

### Liquidity, price discovery, and a two-sided quote

A buyer naturally wants to pay less; a seller wants to receive more. A market exists when those intentions can meet at observable prices. The **bid** is the highest displayed price at which someone is currently willing to buy. The **offer** or **ask** is the lowest displayed price at which someone is willing to sell. If a contract is quoted `7.85 at 8.20`, a trader can usually sell into 7.85 or buy at 8.20, subject to the available size.

A **market maker** continuously offers both sides. This does three useful things:

1. It gives an investor an immediate counterparty.
2. It helps the market discover a price through competing quotes.
3. It transfers risk from someone who wants to remove it now to a specialist prepared to manage it over time.

An official market-maker program may require quotes to remain active for a minimum fraction of the trading day, stay within a maximum width, and display a minimum size. In exchange, the market maker may receive lower fees, more message capacity, or other exchange benefits. The obligation matters: providing liquidity is not the same as posting one attractive price only when trading feels easy.

### Fair value, the spread, and edge

The market maker begins with a model estimate called **theo**, short for theoretical value. Suppose the model says an option is worth 8.02. A possible quote is 7.85 bid and 8.20 offered. The quote surrounds theo rather than sitting exactly on it because the market maker needs compensation for uncertainty, adverse selection, hedging costs, inventory, and operational risk.

If the maker buys at 7.85, the model-implied edge is

$$
\text{buy edge}=\text{theo}-\text{buy price}=8.02-7.85=0.17.
$$

If the maker sells at 8.20,

$$
\text{sell edge}=\text{sell price}-\text{theo}=8.20-8.02=0.18.
$$

Points are not yet dollars. For quantity $q$ and contract multiplier $m$,

$$
\boxed{\text{cash edge}=\text{edge}\times q\times m.}
$$

Buying 25 contracts with a 100 multiplier at 0.17 below theo records an initial modeled edge of $0.17\times25\times100=\$425$. That number is not guaranteed profit. Theo can be wrong, the underlying can jump before a hedge is completed, and volatility can change. Edge is the cushion with which the risk-management process begins.

> **Core idea.** A market maker is not trying to predict the final payoff of every contract. The repeatable process is: estimate fair value, quote around it, collect positive edge when trades arrive, and manage the portfolio that remains.

### Why win rate is the wrong scoreboard

Imagine buying an option at 1.00 and later selling it at 1.05. It eventually expires worthless. Calling the purchase a loss and the sale a win misses the point: together the two trades earned 0.05 before costs. A trading book must be evaluated by the combined cash flows and changing risk, not by labeling each fill as correct or incorrect in isolation.

This is why market making is a statistical business. Many small edges must be large enough, in aggregate, to cover bad fills, model error, transaction costs, and rare moves. A high percentage of superficially profitable trades can still hide dangerous tail risk; a lower win rate can still be profitable if gains and losses are shaped well.

## How Trading Actually Happens

### The language on a trading screen

Several terms appear constantly:

| Term | Practical meaning |
| --- | --- |
| Bid / offer | Best displayed buy price / sell price |
| Size | Contracts available at a quoted price |
| Spread | Offer minus bid |
| Fill | An order has traded |
| Tick size | Smallest legal price increment |
| Queue priority | Who trades first when several orders share a price |
| Liquidity | Ability to trade size near fair value without moving the market much |
| Theo / sheets | Model-based fair value / the set of theoretical values |
| Settlement | The rule and time at which the contract's final or daily value is determined |
| Mark-to-market | Revaluing open positions at current settlement or market prices |

A narrow spread alone does not prove deep liquidity. A market one cent wide with one contract on each side may be less useful than a slightly wider market with thousands available. We care about both **price** and **size**, and about how quickly the book refills after a trade.

Some desk language comes from the trading-floor era. **Paper** meant customer flow delivered to market makers; a **local** was a market maker standing in the pit. A very low-priced option may be called a **teenie**, often used to isolate a small amount of movement exposure. Traders may say volatility is **bid** or “ripping” when options are bought aggressively and implied volatility rises; **offered** or “smashed” describes persistent option selling and falling IV. The words are informal, but the underlying observation—how order flow changes the implied-volatility surface—is precise.

On many electronic markets, orders at the same price follow **price-time priority**: the best price wins first, and among equal prices the earliest order is first in line. Improving a bid by one tick may gain priority but sacrifices edge. Joining an existing price preserves edge but may place the order behind a large queue. That trade-off is part of quoting.

### Order instructions

An order is more than a price and quantity. Its time-in-force and execution condition determine what the matching engine may do:

| Instruction | Meaning |
| --- | --- |
| AON | All-or-None: execute the entire quantity or none of it |
| IOC / FAK | Execute immediately as much as possible; cancel the rest |
| FOK | Execute the entire quantity immediately or cancel everything |
| GFD | Remain active for the trading day |
| GTC | Remain active until filled or explicitly cancelled |
| OCO | When one linked order fills, cancel the other |

IOC and FOK are easy to confuse. If 80 contracts are offered and an IOC arrives to buy 100, it may buy 80 and cancel 20. A FOK for 100 must find all 100 immediately or do nothing.

### Screens, floors, and OTC markets

Most liquid contracts now trade electronically. Servers communicate with an exchange matching engine, and firms may place hardware close to the exchange to reduce latency. In a highly competitive market, even a small delay can determine queue position or whether a stale quote is cancelled before someone trades against it.

Open-outcry trading floors historically coordinated orders through voice, hand signals, brokers, and local market makers. The technology differed, but the economic task was familiar: communicate an exact contract, side, price, and size under time pressure. A verbal mistake immediately became a position.

In an **over-the-counter (OTC)** trade, two counterparties negotiate terms directly. OTC contracts can customize expiry, strike, multiplier, settlement, or underlying exposure. The flexibility is valuable, but counterparty credit risk becomes more important than in a centrally cleared exchange contract.

Regulation depends on the product and jurisdiction. In the United States, futures and futures options are generally overseen by the CFTC, while listed equity options fall principally under the SEC framework. Exchanges and clearing organizations add their own risk, margin, and membership rules.

Product families also have different homes. CME Group venues include major equity-index, rates, agricultural, energy, and metals derivatives; ICE lists important energy and soft-commodity contracts; Cboe is central to products such as SPX and VIX options. The point is not to memorize a logo list. Venue determines contract specifications, trading hours, tick rules, settlement, exercise, and clearing—details that can change the economics of an apparently similar trade.

## Futures, Forwards, and Contract Mechanics

### A future is an obligation

A futures contract is a standardized agreement to exchange an asset or cash value at a later date. Unlike an option, it does not give one side a choice after the price moves; both sides have an obligation under the contract's settlement rules.

Some futures are **cash settled**. If an index future rises from 5,100 to 5,112 and has a $50 multiplier, a long position gains

$$
(5{,}112-5{,}100)\times\$50=\$600.
$$

Other futures permit **physical delivery**. A grain contract may map to a specified quantity and quality at approved locations. A trader who only wants price exposure must know the first notice day and last trading day; ignoring the delivery calendar can transform a financial position into a logistical problem.

Futures also allow commercial hedging. If a producer expects to sell 30,000 units of a crop after harvest and each future represents 5,000 units, selling six contracts can offset much of the price decline risk. If the cash crop becomes less valuable, the short futures position tends to gain. The hedge is not automatically perfect: basis risk, quantity uncertainty, quality, location, and timing can all matter.

### Spot, forward, and carry

An option expiring in the future is naturally connected to the asset's value at that future date. With continuous compounding, no dividends, and no storage effects, the no-arbitrage forward price is

$$
F_0=S_0e^{rT}.
$$

If the asset pays a continuous dividend yield $q$,

$$
\boxed{F_0=S_0e^{(r-q)T}.}
$$

The intuition is a financing argument. Buying the asset today ties up $S_0$ and earns dividends; agreeing today to buy it only at expiry delays that financing. For commodities, storage, convenience yield, and other carrying costs enter the same logic.

Suppose a non-dividend-paying stock is 148, the continuously compounded annual rate is 4%, and expiry is 120 days away. Then

$$
T=\frac{120}{365},\qquad
F_0=148e^{0.04(120/365)}\approx149.96.
$$

For option moneyness, the relevant comparison is often strike versus the expiry-matched forward, not strike versus today's spot alone.

### Multipliers and ticks turn quotes into money

Every contract specification tells us what one quoted point means. The universal conversion is

$$
\boxed{\text{cash P\\&L}=\text{price move}\times\text{quantity}\times\text{multiplier}.}
$$

If a contract's minimum tick is 0.25 and its multiplier is 50, one tick is worth $0.25\times50=\$12.50$ per contract. Ten contracts moving three ticks create $12.50\times10\times3=\$375$ of P&L. Many trading errors are not failures of advanced mathematics; they are failures to carry the multiplier, units, or sign.

> **Before calculating risk, write down five fields:** underlying, expiry, strike, settlement method, and multiplier. The same displayed price can represent very different cash exposure under different contract specifications.

## Options and Payoff Building Blocks

### Rights, obligations, and the four atoms

A **call** gives its buyer the right, but not the obligation, to buy the underlying at strike $K$. A **put** gives its buyer the right to sell at $K$. The option seller receives premium and accepts the corresponding obligation if the buyer exercises or the contract settles in the money.

Let $S_T$ be the underlying at expiry, $c$ the call premium, and $p$ the put premium. Ignoring financing for the payoff picture,

$$
\begin{aligned}
\Pi_{\text{long call}}&=\max(S_T-K,0)-c,\\
\Pi_{\text{long put}}&=\max(K-S_T,0)-p,\\
\Pi_{\text{long underlying}}&=S_T-S_0,\\
\Pi_{\text{short position}}&=-\Pi_{\text{long position}}.
\end{aligned}
$$

These are the atoms from which more elaborate expiry profiles are built. A long call has limited loss—the premium—but unbounded upside in the simplified model. A short call receives limited premium but can face very large upside loss. The diagram is not a prediction of where the underlying will finish; it is a map from a possible terminal price to P&L.

### Intrinsic and extrinsic value

Using an expiry-matched forward $F$ for the simplified moneyness view,

$$
I_C=\max(F-K,0),\qquad I_P=\max(K-F,0).
$$

An option's price can be decomposed conceptually as

$$
\text{option value}=\text{intrinsic value}+\text{extrinsic value}.
$$

An in-the-money option has positive intrinsic value. An out-of-the-money option has none, but it may still be valuable because future movement can bring it into the money. An at-the-money option has strike near forward and often carries substantial time value because relatively small moves can change its terminal state.

Extrinsic value is shaped mainly by distance from at-the-money, time to expiry, and implied volatility. More time creates more opportunities for movement. More volatility makes a wider range of terminal prices plausible. Neither statement means an option must appreciate every day; the full model depends on all inputs moving together.

### Strategy payoffs are signed sums

There is no need to memorize every option strategy as an unrelated picture. Write the signed legs and add their payoffs.

| Long structure | Signed legs | Main expiry shape |
| --- | --- | --- |
| Call spread | $+C(K_1)-C(K_2)$, $K_1<K_2$ | Bullish exposure capped above $K_2$ |
| Put spread | $+P(K_2)-P(K_1)$, $K_1<K_2$ | Bearish exposure capped below $K_1$ |
| Butterfly | $+C(K_1)-2C(K_2)+C(K_3)$ | Peaks near the middle strike |
| Straddle | $+C(K)+P(K)$ | Benefits from a large move either way |
| Strangle | $+P(K_1)+C(K_2)$ | Cheaper wings; needs a larger move |
| 1-by-2 ratio | Buy one option, sell two farther options | Limited-region view with potentially exposed tail risk |
| Risk reversal | Buy one OTM side, sell the other | Directional/skew exposure with one leg financing another |
| Covered call | Long underlying, short call | Earn premium while capping upside |
| Protective put | Long underlying, long put | Pay premium for a downside floor |

A 95/110 call spread, for example, can never be worth more than 15 at expiry. Above 110, the long 95 call gains one-for-one while the short 110 call loses one-for-one; the slopes cancel. That maximum value is also a useful no-arbitrage bound before expiry.

## Put-Call Parity and No-Arbitrage

### One payoff, two constructions

At the same strike and expiry, long call plus short put has terminal payoff

$$
\max(S_T-K,0)-\max(K-S_T,0)=S_T-K.
$$

That is exactly the payoff of a long forward struck at $K$. Therefore the prices must be consistent. In a zero-rate simplified setting,

$$
\boxed{C-P=F-K.}
$$

With discounting expressed through an expiry-matched forward,

$$
C-P=e^{-rT}(F_0-K).
$$

Equivalently, using spot and a continuous dividend yield,

$$
C-P=S_0e^{-qT}-Ke^{-rT}.
$$

The version chosen is less important than internal consistency. Mixing an undiscounted forward with a discounted strike, or using spot in one leg and forward in another, creates a fake arbitrage.

Suppose $F_0=104$, $K=100$, $r=0$ for simplicity, and a call is 7.30. Parity requires

$$
7.30-P=104-100,qquad P=3.30.
$$

The call has 4 of intrinsic value relative to forward and 3.30 of time value. The put is out of the money and its entire 3.30 price is time value. The equal time values are not a coincidence; parity links them.

### Reversal, conversion, and boxes

If the synthetic forward and actual forward disagree, traders can combine them:

$$
\begin{aligned}
\text{reversal}&=+C-P-F,\\
\text{conversion}&=-C+P+F.
\end{aligned}
$$

The exact long/short naming convention can be easier to remember through payoff logic: construct a synthetic position from options and offset it with the real forward. The result should have no underlying exposure at expiry. If its initial price is favorable after costs and funding, the discrepancy can be traded.

A long box between strikes $K_1<K_2$ can be written

$$
+C(K_1)-P(K_1)+P(K_2)-C(K_2).
$$

The first call-put pair is a long synthetic forward at $K_1$; the second is a short synthetic forward at $K_2$. At expiry the box pays the fixed amount $K_2-K_1$ in every state, so its present value is approximately

$$
\text{box value}=e^{-rT}(K_2-K_1),
$$

subject to real-world conventions, exercise features, funding, and transaction costs. A box is therefore closely related to lending or borrowing through option prices.

### Sanity checks before trusting a model

A model output should satisfy structural bounds:

- Every option value is nonnegative.
- An in-the-money option cannot be worth less than the appropriately discounted exercise value.
- A $K_1/K_2$ call spread lies between 0 and $K_2-K_1$.
- A standard symmetric butterfly cannot have a negative value under the usual no-arbitrage assumptions.
- Put-call parity must hold for matching underlying, strike, expiry, settlement, and exercise conventions.
- More optionality should not mysteriously become cheaper when every other relevant contract feature is held consistent.

These are not substitutes for a pricing model. They are tests that a price must pass before sophisticated calibration deserves attention.

## Theo, Portfolios, and the Risk Map

### From one contract to a book

Option pricing models take inputs such as forward $F$, time to expiry $T$, implied volatility $\sigma$, interest-rate information $r$, and contract terms. They produce a theo. Traders may then adjust volatility or other assumptions to reflect market information and the risks already present in the book.

For a multi-leg structure, value is a signed sum. If leg $i$ has quantity $q_i$, multiplier $m_i$, and theo $V_i$,

$$
V_{\text{book}}=\sum_i q_i m_i V_i.
$$

The same aggregation works for local risk measures:

$$
\Delta_{\text{book}}=\sum_iq_im_i\Delta_i,
\qquad
\mathcal V_{\text{book}}=\sum_iq_im_i\mathcal V_i,
$$

with consistent units. This is why a desk can reason about thousands of contracts without drawing thousands of expiry diagrams. Individual positions are translated into common risk coordinates and aggregated.

### Greeks as coordinates, not predictions

For small changes, an option's value can be approximated by

$$
dV\approx \Delta\,dS+\frac12\Gamma(dS)^2+\Theta\,dt
+\mathcal V\,d\sigma+\rho\,dr.
$$

Each Greek answers a conditional question:

| Greek | Local question | Typical long outright option sign |
| --- | --- | --- |
| Delta | What if the underlying moves a little? | Call positive; put negative |
| Gamma | How will delta change as the underlying moves? | Positive |
| Theta | What if one unit of time passes? | Negative |
| Vega | What if implied volatility rises by one point? | Positive |
| Rho | What if the relevant interest rate rises? | Depends on call/put and structure |

The approximation is local. If the underlying jumps, volatility reprices, and time passes simultaneously, higher-order and cross effects may matter. Greeks do not promise the future; they describe the slope and curvature of today's model surface.

> **Risk discipline.** Always attach a unit and convention to a Greek. “Vega 0.08” is incomplete until we know whether that means price change per one volatility point, what multiplier applies, and whether the number is per contract or already aggregated.

## Delta and Gamma Hedging

### Three ways to read delta

Delta is

$$
\Delta=\frac{\partial V}{\partial S}.
$$

It has three useful interpretations:

1. **Sensitivity:** an option with delta 0.52 gains about 0.52 when the underlying rises by 1, for a sufficiently small move.
2. **Hedge ratio:** one long 0.52-delta option can be locally offset by selling 0.52 units of underlying.
3. **Loose probability intuition:** under particular model assumptions, call delta resembles a risk-adjusted probability-like measure of finishing in the money. This is an intuition, not a universal physical probability.

Call deltas usually lie between 0 and 1; put deltas between -1 and 0. Traders often multiply by 100 in speech, calling 0.52 a “52-delta” option. For matching European-style call and put assumptions,

$$
\Delta_C-\Delta_P=1.
$$

Thus a 0.88-delta call corresponds to a put near -0.12 under the same conditions.

If a trader buys 200 calls, each with delta 0.46, and each option maps one-for-one to the hedging future in the quoted delta convention, the option position carries approximately $200\times0.46=92$ futures-equivalent deltas. Selling 92 futures makes the initial portfolio approximately delta neutral.

In a **covered** or **tied** option trade, the option and a specified delta hedge are executed together. For example, 100 covered 52-delta calls are paired with roughly 52 futures in the opposite direction. If the option quantity is split among counterparties, the hedge must be allocated using tradable integer quantities, with the rounding rule made explicit. Bundling the hedge reduces the immediate direction exposure between the option fill and the underlying execution, but it does not freeze delta after the market moves.

Neutral does not mean riskless. It means the first-order exposure to an infinitesimal underlying move is near zero **at that moment**.

### Gamma explains why the hedge moves

Gamma measures how delta changes:

$$
\Gamma=\frac{\partial\Delta}{\partial S}=rac{\partial^2V}{\partial S^2}.
$$

If a call has delta 0.40 and gamma 0.025, a one-unit rise in the underlying changes delta approximately to 0.425; a one-unit decline changes it to 0.375. A long vanilla option has positive gamma. As the underlying rises, the position becomes more positive delta; as it falls, it becomes more negative delta relative to its starting hedge.

That behavior creates the intuition behind **gamma scalping**. Begin long gamma and delta neutral. If the underlying rises, the option gains positive delta, so sell underlying to re-neutralize. If the underlying later falls, delta declines and the hedge can be bought back lower. The hedge transactions sell high and buy low. The process can earn from realized movement—but the option holder pays theta for owning that convexity.

### Cash gamma

Desks often express gamma in cash terms. One convention asks: how much does cash delta change when the underlying moves 1%? If a future trades at 80 and has a multiplier of 1,000, each future has cash delta

$$
80\times1{,}000=\$80{,}000.
$$

If an option book gains 2.5 futures-equivalent deltas after a 1% move, its one-percent cash gamma is approximately

$$
2.5\times\$80{,}000=\$200{,}000.
$$

Cash gamma depends on convention, so a report should state the move size and units. Gamma tends to be largest for at-the-money options near expiry because delta must transition through a large range in a narrow region of underlying prices. That concentration is useful when movement occurs, but it makes the hedge change quickly.

## Theta, Volatility, and the Price of Movement

### Theta is the rent on optionality

Theta measures the effect of time passing while other model inputs are held fixed. A long option generally has negative theta because one day fewer remains for favorable movement. A short option generally earns positive theta while accepting convexity and tail risk.

Suppose 80 long options fall from 2.40 to 2.32 due only to one day's passage, with a multiplier of 100. The book theta is

$$
(2.32-2.40)\times80\times100=-\$640\text{ per day}.
$$

If dynamic hedging earns $900 from realized movement that day, the simplified gamma-versus-theta result is $900-640=\$260$ before other effects and costs. If the underlying hardly moves, there may be little gamma-scalping revenue and theta dominates.

This gives the central economic trade-off:

> **Long gamma pays theta to own convexity. Short gamma collects theta but owes the market increasingly unfavorable delta as it moves.**

One rough desk convention connects one-percent cash gamma, a one-day move $m$ expressed in percentage points, and fair daily theta:

$$
\text{fair daily theta}\approx
\frac{\text{cash gamma}_{1\%}\,m^2}{200}.
$$

This is a mnemonic derived from a local quadratic approximation, not a universal pricing formula. It is useful because it forces the right comparison: the theta paid for convexity should be judged against the amount of realized movement available to monetize through hedging.

### Realized, implied, and forward volatility

Volatility appears in several related but distinct forms:

- **Historical or realized volatility** summarizes movement that occurred over a past window.
- **Implied volatility (IV)** is the volatility input that makes a pricing model reproduce the observed option price.
- **Forward volatility** describes the volatility implied for a future interval between two expiries.

Using daily log returns and 252 trading days, a zero-mean realized-volatility estimator is

$$
\widehat\sigma_{\text{ann}}
=\sqrt{\frac{252}{n}\sum_{i=1}^{n}\left(\ln\frac{S_i}{S_{i-1}}\right)^2}.
$$

An annualized volatility scales to a shorter horizon through the square root of time:

$$
\sigma_t=\sigma_{\text{ann}}\sqrt{\frac{t}{252}}.
$$

At 24% annualized volatility, a one-day standard deviation is approximately

$$
24\%\sqrt{\frac1{252}}\approx1.51\%.
$$

That is not the expected absolute move. Under a normal approximation,

$$
\mathbb E|R|=\sqrt{\frac2\pi}\,\sigma\approx0.798\sigma,
$$

so the corresponding expected absolute one-day move is about $1.21\%$. “Twenty-four vol” does not mean the asset moves exactly 24% per year, nor should it be divided by 252 to estimate a daily move.

Variance—not volatility—adds across independent time intervals. If an early interval has volatility $\sigma_1$ over length $T_1$ and a later interval has $\sigma_2$ over length $T_2$, total variance is proportional to $\sigma_1^2T_1+\sigma_2^2T_2$. Forward volatility must therefore be extracted from variance differences rather than by subtracting volatilities directly.

### What implied volatility really says

IV is a translation of price into a standardized model coordinate. Two options with different strikes cannot be compared intelligently by premium alone, because their intrinsic value and distance from the underlying differ. Converting each price into implied volatility removes some of those mechanical differences and makes the market's relative pricing easier to inspect.

IV is not a pure forecast. It may include supply and demand, risk premium, inventory pressure, event risk, jumps, skew, liquidity, and limitations of the chosen model. When traders say volatility is “bid” or “offered,” they mean option prices are being lifted or sold in a way that raises or lowers the implied-volatility surface.

## Vega, Rho, and Term Structure

### Vega: the volatility coordinate

Vega measures sensitivity to implied volatility:

$$
\mathcal V=\frac{\partial V}{\partial\sigma}.
$$

Market convention usually reports the price change for a one-percentage-point change in IV. If an option has vega 0.09, moving IV from 21% to 22% increases theo by about 0.09, all else equal. One thousand contracts with multiplier 50 have book vega

$$
0.09\times1{,}000\times50=\$4{,}500
$$

per volatility point. A one-point decline would lose approximately the same amount under the local approximation.

Long vanilla calls and puts have positive vega. Vega is commonly highest near at-the-money and generally larger for longer maturities, because a volatility change has more time to alter the terminal distribution. A portfolio can be delta neutral yet carry substantial vega; removing direction risk does not remove volatility risk.

This explains the desk phrase **option traders are volatility traders**. A maker can convert a price into IV, compare that IV across strikes and maturities, adjust a surface, and convert the surface back into theos. Price and implied volatility are two views of the same model relationship.

### Rho and the rate curve

Rho measures sensitivity to interest rates:

$$
\rho=\frac{\partial V}{\partial r}.
$$

For a small retail position, rho may look less dramatic than delta or vega. For a large book across many expiries, rate exposure can be meaningful. The model does not use one universal rate: each cash flow and maturity corresponds to a point on a funding or discount curve.

Return to a box spread that pays 500 at expiry. If its current fair value is 496, buying the box resembles lending 496 today to receive 500 later. When rates rise, the present value of that fixed 500 generally falls. Positions at different maturities can therefore offset under a parallel rate shift while remaining exposed to changes in the **shape** of the curve.

### Risk is a surface, not five isolated numbers

The Greeks interact. A market move changes delta through gamma; time passing can change gamma and vega; an event can move both the underlying and IV; a new rate curve changes forwards as well as discounting. Professional risk management therefore examines scenarios and surfaces in addition to one-number Greeks.

A useful sequence is:

1. Aggregate current Greeks with consistent signs and units.
2. Inspect concentration by strike, expiry, and underlying.
3. Apply plausible joint scenarios rather than moving one input forever in isolation.
4. Revalue the portfolio under the full model.
5. Compare scenario P&L with the Greek approximation and investigate the difference.

## The Complete Market-Making Loop

We can now connect every part of the course.

1. **Observe the market.** Read the underlying, forward curve, option book, sizes, recent trades, and relevant events.
2. **Build model inputs.** Use forward, expiry, rates, dividends or carry, and an implied-volatility surface.
3. **Calculate theo and Greeks.** Theo anchors a two-sided quote; Greeks describe the local risk created by a fill.
4. **Quote around fair value.** Width and size reflect uncertainty, liquidity, inventory, competition, fees, and hedging cost.
5. **Trade and record edge.** Compare the execution price with theo using the correct side, quantity, and multiplier.
6. **Aggregate the book.** Combine positions across strikes and expiries into delta, gamma, theta, vega, rho, and scenarios.
7. **Hedge selectively.** Use underlying, options, spreads, or other maturities to reshape unwanted exposure.
8. **Update continuously.** Prices, volatility, time, inventory, and correlations change; yesterday's neutral book is not today's neutral book.

The loop contains an important feedback path. The model creates theo, but the market also teaches the model. If comparable options consistently trade away from the current surface, the input assumptions may be stale. A trader should not mechanically force every price into an old model, nor mechanically copy every market price without checking arbitrage relationships. Modeling and observation correct each other.

> **A compact decision check before any option trade:** What is the contract? Where is fair value? What edge does this side receive? Which Greeks change? How will the position behave under a realistic joint move? Which no-arbitrage relation can catch a sign or unit error?

## Formula Sheet and Oral Checks

### The formulas worth reconstructing

$$
\begin{aligned}
\text{Mid} &= \frac{\text{bid}+\text{ask}}2,\\
\text{Cash P\\&L} &= \text{points}\times\text{quantity}\times\text{multiplier},\\
F_0 &= S_0e^{(r-q)T},\\
I_C &= \max(F-K,0),\qquad I_P=\max(K-F,0),\\
C-P &= e^{-rT}(F_0-K),\\
\text{Cash edge} &= \text{edge}\times\text{quantity}\times\text{multiplier},\\
\Delta_{\text{book}} &= \sum_iq_im_i\Delta_i,\\
\mathcal V_{\text{book}} &= \sum_iq_im_i\mathcal V_i,\\
\sigma_t &= \sigma_{\text{ann}}\sqrt{t/252},\\
\mathbb E|R| &\approx0.798\sigma_t.
\end{aligned}
$$

Do not memorize these as decorative symbols. Reconstruct each from meaning. Midpoint averages two prices. Cash P&L converts points through quantity and multiplier. Forward price carries spot to expiry. Parity equates two constructions of one terminal payoff. Portfolio Greeks add signed local exposures. Volatility scales with the square root of time because variance adds over time.

### Ten quick checks

1. **You buy 100 calls with delta 0.57. What is the first hedge?** Sell about 57 units of the delta-matched underlying.
2. **Why does a long put usually need a long-underlying hedge?** The put has negative delta.
3. **What is the gamma sign of a long vanilla option?** Positive.
4. **What is the theta sign of a long vanilla option?** Usually negative.
5. **What happens to a long outright option when IV rises?** Positive vega produces a local gain, all else equal.
6. **What is the maximum terminal value of a 20-point call spread?** 20.
7. **What does long call minus long put synthesize?** A long forward at the common strike and expiry.
8. **Why can near-expiry at-the-money gamma become large?** Delta changes from near 0 to near 1 across a narrow price interval.
9. **Is volatility equal to expected absolute movement?** No; under a normal approximation, expected absolute movement is about 0.798 standard deviations for the same horizon.
10. **What determines a box's terminal value?** The distance between its strikes; its current value discounts that fixed payment.

If you can answer those questions while keeping the signs, units, and assumptions straight, the structure is in place. The next step is not another vocabulary list. It is practice: take a small option chain, write the contract specifications, infer the forward, check parity, calculate a few strategy bounds, and explain how one fill changes the book's Greeks. That is where the course stops being a set of definitions and becomes a way of thinking.
