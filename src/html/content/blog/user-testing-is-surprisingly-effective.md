---
layout: blog-post.html
type: blog-post
date: 2013-01-28
title: User testing is surprisingly effective
long_description: By observing our users use our donate forms we were able to reduce errors on some fields by as much as 63% which in turn lifted conversion rates on subsequent pages. Here's how we did it.
short_description: At the Obama campaign we learned how important qualitative data can be in optimizing our web apps.
---
The user testing we conducted at the Obama campaign reduced form field validation errors by as much as 63%. Perhaps more surprisingly we found that this reduction in user frustration lifted conversion rates for subsequent pages that were not manipulated at all.

In past blog posts I discussed how optimizing <a href="">page load</a> and <a href="">design and copy</a> through a/b testing can have dramatic affects on conversion rates. While a/b and multivariate testing is a great way to gather quantitative data, it does not give you qualitative data and this is essential to improving web apps. User testing to the rescue!

##How we conducted user testing

For those not familiar with user testing, the idea is simply to observe users interacting with your web app in a controlled environment. We installed <a href="http://silverbackapp.com/" target="_blank">Silverback</a> on a Macbook which allowed us to record the screen and the camera while a user carried out a task. We put the laptop in a small conference room and setup extra lighting so that we could clearly see the user's face. We then worked closely with our volunteer coordinator who found lots of retired people, students and people in between to make test donations on laptops, tablets and phones. After each test we interviewed the user and solicited their thoughts.

##What we learned

We went into user testing with no expectations because as engineers we were very familiar with the way we used our own products, but we had not idea how actual users did. To our surprise we uncovered several issues with our donate forms that we probably would have never found without user testing. Here is a list of the issues that were reported to us ordered by frequency.

1. The type was too hard to for users read
2. Users did not know what format the credit card number and format should be entered in
3. Users who were not employed did not know what to enter for the employer and occupation fields

##Solutions and results

###Credit card formatting

Many of the users we interviewed told us they weren't sure what format their credit card number should be entered in. We knew what format we wanted it in, but our users didn't. Should they enter it like this "5555555555555555", this "5555 5555 5555 5555" or this "5555-5555-5555-5555"? To solve this problem we wrote some JavaScript that formatted the number like the second example as the user typed it.

![15% error reduction](http://cdn.kylerush.org/kr/images/formatted-credit-card-number.png)

The formatting reduced the error rate on the credit card number field by 15%.

###Employer and occupation fields

Our data showed that the employer and occupation fields had one of the highest error rates of all the fields. When we looked at the values people submitted we saw things like "none of your business" so we assumed that the reason the error rate was so high was because people were uncomfortable providing this information. However we learned through user interviews that retired people and students were unsure what to put in the fields. To solve this problem we added one lin below the fields that read "If you are retired, please enter 'retired' in both fields."

![63% reduction in errors](http://cdn.kylerush.org/kr/images/employer-occupation.png)

The one line hint reduced the error rate on the employer field by 63% and the occupation field by 58%.

While spending so much time trying to reduce error rates on our donate form we noticed a latent affect. After one of our users made a donation they were taken to an upsell page which asked them to save their payment information. We noticed that when we reduced the error rate on the donation form, we got up to a 7% increase in conversions on the upsell page, without touching the upsell page at all. This is one of the data points that justified spending so much time improving the user experience of our forms.

##Conclusion

The qualitative data that user testing provides made a big difference both to our users' experience and to our conversion rates. We found out that a lot of the assumptions we made about our donate forms were wrong and in hindsight I'm glad we challenged our assumptions. Reducing user frustration with your products is a good thing to do for your users, but it can also help achieve business goals. User testing is worth every minute of your time.

Comments here: [http://news.ycombinator.com/item?id=5133760](http://news.ycombinator.com/item?id=5133760)
