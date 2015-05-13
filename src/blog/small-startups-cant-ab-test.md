---
template: index.html
bodyID: blog
title: Busting the small startups can't a/b test myth
description: Busting the small startups can't a/b test myth
longDescription: <p>I often hear in the startup community that small startups can't a/b test. While it's true that small startups can't detect subtle changes in the conversion rate, there is still a lot of value for small startups to a/b test.
---
As the head of Optimization at <a target="_blank" href="https://www.optimizely.com">Optimizely</a> I often hear in the startup community that small startups cannot run meaningful a/b tests because they have low traffic levels. This is not true. Let me explain why.

The notion is centered on the idea that it could take hundreds of thousands of visitors to detect a subtle difference in the conversion rate. This part is true and it can be verified with a <a href="http://www.evanmiller.org/ab-testing/sample-size.html" target="_blank">sample size calculator</a>. Given a 5% baseline conversion rate, you need 120,146 unique visits per branch, totalling 240,292 to detect a 5% relative effect in the conversion rate.

Obviously small startups do not have anywhere near this level of traffic. Subtle effects in the 5% range are off the table. That is not a huge loss as there is certainly an argument to be had that small startups should not chase subtle effects in the first place.

What about a larger effect? Given the same 5% baseline conversion rate, you need 3,124 visits for a 45% minimum detectable effect (MDE). Aha! That is within the range of a small startup. At this sample size the startup can detect a 45% increase or decrease from a homepage redesign for example.

The sample size reduces further if the small startup has a higher conversion rate. With a 10% baseline conversion rate, it can detect a 45% difference with 1,472 visits&mdash;less than half the amount required for a 5% baseline conversion rate.

MDE and the baseline conversion rate have a negative relationship with sample size. When the baseline conversion rate increases, the sample size decreases. Similarly, when the MDE increases, the sample size decreases. Significance level and statistical power also affect sample size, but you should not set significance higher than 5% and power lower than 80% unless you have a solid grasp of statistics.

It is harder to produce a winner with a high MDE so small startups would be wise to avoid testing small changes like button colors. Instead, they should take hints from companies like 37Signals which redesigned the Basecamp homepage gaining a <a href="http://signalvnoise.com/posts/2991-behind-the-scenes-ab-testing-part-3-final" target="blank">103%</a> increase in signups. Or <a href="http://blog.optimizely.com/2012/10/09/optimizelys-100000th-experiment/" target="blank">Optimizely's homepage redesign</a> that yielded a 46% increase in new accounts. Or this <a href="http://blog.optimizely.com/2013/11/26/spreadshirt_redesign_case_study/" target="blank">606% increase</a> from a redesign of Spreadshirt's homepage. Or this <a href="http://kylerush.net/blog/quantifying-and-reducing-user-frustration/" target="blank">63% reduction in errors</a> on the Obama campaign's donation forms. Or  There are <a href="https://www.optimizely.com/customers/customer-stories" target="blank">many other examples</a> out there of companies using tests to find large effects in the conversion rate.

Let the record stand corrected: small startups can find meaningful results from a/b tests. Furthermore, they are wasting potential by not a/b testing because the traffic will come to their website regardless. Might as well be smart and take advantage of it.

Interested in a/b testing? You should follow me on Twitter <a href="https://twitter.com/kylerush" target="_blank">@kylerush</a>
