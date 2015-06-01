---
layout: blog-post.html
type: blog-post
date: 2014-01-06
title: A/b testing is for engineers too
long_description: A story about how the engineers on the Obama campaign used a/b testing to avoid a multi-million dollar mistake when building out a new online donation processor.
short_description: How Obama campaign engineers avoided a multi-million dollar mistake with a simple a/b test
---
Take a look at the results from an [Optimizely](http://www.optimizely.com) a/b test below from the Obama campaign showing a 24.3% reduction in the conversion rate at the 100% confedence interval.</p>

<figure class="image">

	<a href="http://cdn.kylerush.org/kr/images/obama-ofa-vs-bsd-test-1-full.png" target="_blank">

		<div data-picture class="data-picture" data-alt="The new API reduced the donation conversion rate by 24.3% at the 100% confidence interval." src="http://cdn.kylerush.org/kr/images/obama-contribute-architecture.png">

			<div data-src="http://cdn.kylerush.org/kr/images/obama-ofa-vs-bsd-test-1-650.png"></div>

			<div data-src="http://cdn.kylerush.org/kr/images/obama-ofa-vs-bsd-test-1-300.png" data-media="(min-width: 300px)"></div>

			<div data-src="http://cdn.kylerush.org/kr/images/obama-ofa-vs-bsd-test-1-650.png" data-media="(min-width: 600px)"></div>

		</div>

	</a>

	<figcaption>"OFA API" reduced the donation conversion rate by 24.3% at the 100% confidence interval.</figcaption>

</figure>

If you cringed after seeing that, I don't blame you. That's a substantial loss in conversions. You'll probably cringe again when I say that I'm proud of that large, statistically significant decrease. No, I wasn't sabotaging my own team's success&mdash;quite the opposite actually. The report above is the result of an engineering mistake that we caught very early before it caused exponentially more damage. Here's how it happened.

##How we got here

In the first quarter of 2012 we used a Stripe inspired donation API built by Blue State Digital (BSD) to process most of our online donations. As time progressed the volume of requests to the API increased substantially, eventually amounting to a peak of $3 million an hour. This made any downtime costly because we were neck and neck with Romney in fundraising throughout most of the campaign. We needed a redundant donation processor that was resilient to unplanned outages. To accomplish this we set out to duplicate the BSD API as a redundancy layer.

The design of the our new API was pretty slick. It would be hosted on AWS and use Akamai Global Traffic Management (GTM) to load balance the AWS EC2 application which would be distributed to two different AWS regions. The application would live in data centers in Virginia and California. Akamai GTM would geolocate the IP address of every request and send IPs from the Eastern United States to the US East (Northern Virginia) region and did the same for US West (California). Additionally, if US East went down, all traffic would be sent to the US West region and vice versa.

<figure class="image">

	<a href="http://cdn.kylerush.org/kr/images/obama-contribute-architecture-full.png" target="_blank">

		<div data-picture class="data-picture" data-alt="Planned architecture for contribute.barackobama.com which eventually processed 4.2 million donations." src="http://cdn.kylerush.org/kr/images/obama-contribute-architecture.png">

			<div data-src="http://cdn.kylerush.org/kr/images/obama-contribute-architecture.png"></div>

			<div data-src="http://cdn.kylerush.org/kr/images/obama-contribute-architecture-300.png" data-media="(min-width: 300px)"></div>

			<div data-src="http://cdn.kylerush.org/kr/images/obama-contribute-architecture-650.png" data-media="(min-width: 600px)"></div>

		</div>

	</a>

	<figcaption>Planned architecture for contribute.barackobama.com which eventually processed 4.2 million donations.</figcaption>

</figure>

The actual form submission would be done with an AJAX request on the client side. Once the infrastructure and application were completed we a/b tested the new "OFA API" against the BSD API. To do this we built two nearly identical donation pages that used one of the APIs. We a/b tested to be sure there weren't major bugs missed in the QA process. The result surprised us. Here it is once again.

<figure class="image">

	<a href="http://cdn.kylerush.org/kr/images/obama-ofa-vs-bsd-test-1-full.png" target="_blank">

		<div data-picture class="data-picture" data-alt="The new API reduced the donation conversion rate by 24.3% at the 100% confidence interval." src="http://cdn.kylerush.org/kr/images/obama-contribute-architecture.png">

			<div data-src="http://cdn.kylerush.org/kr/images/obama-ofa-vs-bsd-test-1-650.png"></div>

			<div data-src="http://cdn.kylerush.org/kr/images/obama-ofa-vs-bsd-test-1-300.png" data-media="(min-width: 300px)"></div>

			<div data-src="http://cdn.kylerush.org/kr/images/obama-ofa-vs-bsd-test-1-650.png" data-media="(min-width: 600px)"></div>

		</div>

	</a>

	<figcaption>"OFA API" reduced the donation conversion rate by 24.3% at the 100% confidence interval.</figcaption>

</figure>

We always monitored more than just the macro conversion goal. (a donation in this case) We also monitored errors with donations which were counted on the client side whenever our script received a response from the AJAX request that did not indicate a successful donation. This error goal showed a 93% increase in errors at the 100% confidence interval.

<figure class="image">

	<a href="http://cdn.kylerush.org/kr/images/obama-ofa-vs-bsd-test-1-errors-full.png" target="_blank">

		<div data-picture class="data-picture" data-alt="The new API increased the error conversion rate by 93% at the 100% confidence interval." src="http://cdn.kylerush.org/kr/images/obama-ofa-vs-bsd-test-1-errors-650.png">

			<div data-src="http://cdn.kylerush.org/kr/images/obama-ofa-vs-bsd-test-1-errors-650.png"></div>

			<div data-src="http://cdn.kylerush.org/kr/images/obama-ofa-vs-bsd-test-1-errors-300.png" data-media="(min-width: 300px)"></div>

			<div data-src="http://cdn.kylerush.org/kr/images/obama-ofa-vs-bsd-test-1-errors-650.png" data-media="(min-width: 600px)"></div>

		</div>

	</a>

	<figcaption>The new API increased the error conversion rate by 93% at the 100% confidence interval.</figcaption>

</figure>

We definitely didn't want to see an increase in the error rate. A reduction in errors would be preferred, but we'd also settle for a statistical tie. (indicating no difference between the two APIs) Form submissions were another micro goal we tracked. As you can see below this was a statistical tie&mdash;no difference between the two forms.

<figure class="image">

	<a href="http://cdn.kylerush.org/kr/images/obama-ofa-vs-bsd-test-1-submits-full.png" target="_blank">

		<div data-picture class="data-picture" data-alt="Statistic tie on the form submission conversion rate between between the two APIs." src="http://cdn.kylerush.org/kr/images/obama-ofa-vs-bsd-test-1-submits-650.png">

			<div data-src="http://cdn.kylerush.org/kr/images/obama-ofa-vs-bsd-test-1-submits-650.png"></div>

			<div data-src="http://cdn.kylerush.org/kr/images/obama-ofa-vs-bsd-test-1-submits-300.png" data-media="(min-width: 300px)"></div>

			<div data-src="http://cdn.kylerush.org/kr/images/obama-ofa-vs-bsd-test-1-submits-650.png" data-media="(min-width: 600px)"></div>

		</div>

	</a>

	<figcaption>Statistic tie on the form submission conversion rate between between the two APIs.</figcaption>

</figure>

We quickly stopped the test which diverted 100% of traffic back to the BSD API and reported the results back to the team. The engineer who built the application layer of the API scoured the logs for issues, but found no leads. Curiously the number of donation errors we tracked in Optimizely didn't match the number of errors in the logs&mdash;Optimizely tracked a lot more errors.

Our hypothesis was that the code which validated form field values (email, phone number, etc.) was too strict in the new OFA API so we matched it perfectly to the BSD API. Then we tested again. The result was similar: a 23% reduction in donations at the 100% confidence interval.

<figure class="image">

	<a href="http://cdn.kylerush.org/kr/images/obama-ofa-vs-bsd-test-2-full.png" target="_blank">

		<div data-picture class="data-picture" data-alt="The second test showed similar results: 23% reduction in donation conversions at the 100% confidence interval." src="http://cdn.kylerush.org/kr/images/obama-ofa-vs-bsd-test-2-650.png">

			<div data-src="http://cdn.kylerush.org/kr/images/obama-ofa-vs-bsd-test-2-650.png"></div>

			<div data-src="http://cdn.kylerush.org/kr/images/obama-ofa-vs-bsd-test-2-300.png" data-media="(min-width: 300px)"></div>

			<div data-src="http://cdn.kylerush.org/kr/images/obama-ofa-vs-bsd-test-2-650.png" data-media="(min-width: 600px)"></div>

		</div>

	</a>

	<figcaption>The second test showed similar results: 23% reduction in donation conversions at the 100% confidence interval.</figcaption>

</figure>

Donation errors were even higher in the second test: 148.3% increase in errors at the 100% confidence interval.

<figure class="image">

	<a href="http://cdn.kylerush.org/kr/images/obama-ofa-vs-bsd-test-2-errors-full.png" target="_blank">

		<div data-picture class="data-picture" data-alt="The second test showed similar results: 148% increase in error conversions at the 100% confidence interval." src="http://cdn.kylerush.org/kr/images/obama-ofa-vs-bsd-test-2-errors-650.png">

			<div data-src="http://cdn.kylerush.org/kr/images/obama-ofa-vs-bsd-test-2-errors-650.png"></div>

			<div data-src="http://cdn.kylerush.org/kr/images/obama-ofa-vs-bsd-test-2-errors-300.png" data-media="(min-width: 300px)"></div>

			<div data-src="http://cdn.kylerush.org/kr/images/obama-ofa-vs-bsd-test-2-errors-650.png" data-media="(min-width: 600px)"></div>

		</div>

	</a>

	<figcaption>The second test showed similar results: 148% increase in error conversions at the 100% confidence interval.</figcaption>

</figure>

After thirteen days of searching we couldn't find the problem at the application layer so we brought the problem to our DevOps team. They found the problem in less than a day. The US West data center had an Elastic Load Balancing instance with nothing behind it. Turns out this mistake boiled down to a communication failure. The person who had originally set up the infrastructure didn't complete the US West part of it before leaving on paternity leave and we took it into production before he got back.

<figure class="image">

	<a href="http://cdn.kylerush.org/kr/images/obama-contribute-architecture-launch-full.png" target="_blank">

		<div data-picture class="data-picture" data-alt="Actual architecture when launched: No EC2 instance behind the ELB in AWS US West." src="http://cdn.kylerush.org/kr/images/obama-contribute-architecture-launch-650.png">

			<div data-src="http://cdn.kylerush.org/kr/images/obama-contribute-architecture-launch-650.png"></div>

			<div data-src="http://cdn.kylerush.org/kr/images/obama-contribute-architecture-launch-300.png" data-media="(min-width: 300px)"></div>

			<div data-src="http://cdn.kylerush.org/kr/images/obama-contribute-architecture-launch-650.png" data-media="(min-width: 600px)"></div>

		</div>

	</a>

	<figcaption>Actual infrastructure when launched: No EC2 instance behind the ELB in AWS US West.</figcaption>

</figure>

In layman's terms this means every donation from the western side of the country was dropped on the floor. Once we fixed the problem we set up another a/b test. This time around the result was a statistical tie in conversions indicating no detectable difference between the two APIs.

<figure class="image">

	<a href="http://cdn.kylerush.org/kr/images/obama-ofa-vs-bsd-test-3-full.png" target="_blank">

		<div data-picture class="data-picture" data-alt="Statistic tie in the donation conversion rate between the two APIs with fixed infrastructure." src="http://cdn.kylerush.org/kr/images/obama-ofa-vs-bsd-test-3-650.png">

			<div data-src="http://cdn.kylerush.org/kr/images/obama-ofa-vs-bsd-test-3-650.png"></div>

			<div data-src="http://cdn.kylerush.org/kr/images/obama-ofa-vs-bsd-test-3-300.png" data-media="(min-width: 300px)"></div>

			<div data-src="http://cdn.kylerush.org/kr/images/obama-ofa-vs-bsd-test-3-650.png" data-media="(min-width: 600px)"></div>

		</div>

	</a>

	<figcaption>Statistic tie in the donation conversion rate between the two APIs with fixed infrastructure.</figcaption>

</figure>

The donation error goal was also also a statistical tie.

<figure class="image">

	<a href="http://cdn.kylerush.org/kr/images/obama-ofa-vs-bsd-test-3-errors-full.png" target="_blank">

		<div data-picture class="data-picture" data-alt="Statistic tie in the error conversion rate between the two APIs with fixed infrastructure." src="http://cdn.kylerush.org/kr/images/obama-ofa-vs-bsd-test-3-errors-650.png">

			<div data-src="http://cdn.kylerush.org/kr/images/obama-ofa-vs-bsd-test-3-errors-650.png"></div>

			<div data-src="http://cdn.kylerush.org/kr/images/obama-ofa-vs-bsd-test-3-errors-300.png" data-media="(min-width: 300px)"></div>

			<div data-src="http://cdn.kylerush.org/kr/images/obama-ofa-vs-bsd-test-3-errors-650.png" data-media="(min-width: 600px)"></div>

		</div>

	</a>

	<figcaption>Statistic tie in the error conversion rate between the two APIs with fixed infrastructure.</figcaption>

</figure>

During the post mortem we realized why the issue wasn't found in QA. We worked at Obama for American headquarters in Chicago, IL. All of our test donations went to the functional AWS region on the East Coast. In hindsight it seems obvious that we should have tested the West Coast region, but the QA team wasn't aware of the technical architecture.

##Why engineers should a/b test

When it comes to engineering I've found that, generally speaking, a/b testing is not part of the fundamental workflow as it is with other fields like marketing. There are many uses for a/b testing in engineering such as measuring the impact of performance improvements, which many companies have been doing for a long time.

However, a/b testing doesn't have to be used exclusively to produce lifts in the conversion rate, it can also be used as a QA mechanism. We all know that no matter the skill of the engineering team, mistakes will be made. We also know that, no matter the skill of the QA team, bugs will be missed. Since some mistakes will inevitably make it into production, the best thing we can do is find the bugs as early as possible. A/b testing is one great tool for this.

The day after the story above happened we made a/b testing a fundamental part of our engineering workflow. On a few occassions we made major changes to the JavaScript on donation pages and we a/b tested the change not with a goal of lifting the conversion rate, but to make sure we hadn't introduced a bug that lowered the conversion rate. We also did this for CSS changes. In the very least this gave us some piece of mind in our day to day job which was long, hectic, stressful to say the least.

If we hadn't a/b tested the new API we would have reduced the conversion rate for 100% of traffic by up to 24% for an unknown period of time. It could have taken weeks to figure out the problem. Analysts might have spotted the drop in conversions in reports, but probably not for a couple of days and it's much worse when someone else catches your mistakes. We might also have received bug reports from users, but this would have been frustrating to resolve as our test donations would've gone to the fully functional US East AWS region.

I'm proud that we engineers caught the problem ourselves and that we caught bug while it was exposed to only 50% of users for about 4 hours rather than 100% for an unkown amount of time. This is why I will always make a/b testing a fundamental part of the engineering workflow and why all engineers should do the same.

##Tips for a/b testing

There is no one-size-fits-all strategy and workflow when it comes to a/b testing.

**#1:** Most a/b testing platforms allow you to control the amount of traffic that goes to the variation. In the case above we did a 50/50 split. (50% of traffic to the control, 50% to the variation) In hindsight, we probably should have started off at a 90/10 split because a difference that large would have shown very early with small amounts of traffic. Use traffic splitting to your advantage.

**#2:** There is no one-size-fits-all strategy/workflow for a/b testing. Come to terms with this quickly and work with everyone on your team to find a strategy/flow that works best.

**#3:** Use ROI as guiding light. It may not make sense to hold back a feature release so that you can a/b test the previous feature several times. Tests on the previous feature may show a statistically significant 3% difference in conversion rates, but your next deploy ready feature may lift that conversion rate by 15%. Chasing small difference has a high opportunity cost.

**#4:** The amount of traffic you have and the average conversion rate are the biggest variables which shape your strategy. If you have tens of millions of visits a month you can probably test every code change, even with lower conversion rates. If you have tens of thousands of visits a day and a high conversion rate, you can test a lot as well. If you have lower traffic than that and a low conversion rate (which, let's be honest, is most of us) then you probably won't be able to a/b test every code change. In that case, a/b test only major code changes.

**#5:** Always keep a detailed archive of everything you test. I have a Google Spreadsheet with a row for every test I've ever run. It has these columns: date of test, hypothesis, screenshots (of the results page in Optimizely and the variations, just in case you lose access to the a/b testing platform), results, and comments.

**#6:** Communicate the results back to your team and company effectively.

For full disclosure, I use to work for Optimizely as the Head of Optimization which makes the a/b and multivariate testing platform that we used on the Obama Campaign.
