# <img src="https://ohmi.live/logo400.png" width="auto" height="36em" /> ohmi

Now available at [ohmi.live](https://ohmi.live)!

## Inspiration
Do me a favour, and I’ll do you one. Favours are short and sweet ways to give back to your friends for helping you out in times of need or to simply thank them for their generosity. However, they are terribly difficult to maintain. After a verbal agreement, favours are often forgotten shortly afterwards, if not documented properly. If one or the other party did not document correctly, ambiguity and doubt could brew. That’s all too complicated and serious for something as simple and generous as a favour. What if you could save a favour in the cloud, linked to you and your friend’s google accounts, so that you will never forget another favour again? Thus, ohmi was born.

## What it does
ohmi allows individuals to send personalized favours, or ohmies, over the internet to their friends. To do so, friends Alice and Bob first need to log in via their google accounts and add each other as friends via friend code. Rather than having both parties record a favour asynchronously and ambiguously, (e.g: Alice owes Bob a car ride at some unknown time in the future), Alice can simply send over an ohmi to Bob and it will be shown on both of their accounts (sent ohmies for Alice, received ohmies for Bob). When the favour is done, Bob can claim the ohmi, deleting it from both their references. You can have as many ohmies as you want, with as many friends as you want.

## How we built it
We built the app using React and Ant Design on our frontend and Firebase for authentication, storage, and hosting. We used name.com for our domain (domain.com had some troubles with providing us the domain name).

## Challenges we ran into
Interfacing with Firestore and managing database hooks turned out to be more of a challenge than we had expected. In many places, we had to check for null or undefined database snapshots to prevent uncaught errors from breaking the build. Ultimately, however, we’re confident that we’ve smoothed out the bugs to provide a smooth and seamless user experience.

Moreover, though Ant Design provided many powerful styled components, sometimes it couldn’t provide what we wanted, in which case it proved to be more of a hindrance than an asset. Ultimately, however, we believe that using this library made our prototyping much quicker.

## Accomplishments that we're proud of
We’re proud of building a polished app that scales with Firebase as well as adding the feature of friend codes to better protect user privacy. We’re also proud having almost immediately set up continuous deployment pipelines to have an MVP deployed as soon as possible.

## What we learned
We learned how to use the whole Firebase API. None of the members on our team had ever used Firebase before, so it was quite a challenging experience to learn the APIs for Firestore, Authentication, and ultimately the Cloud Functions as well.


## What's next for ohmi
The next step for ohmi is to implement app shortcuts, desktop notifications, and ultimately a mobile app for even greater convenience. We can also add more fields to the ohmi cards in the ohmi creation form to provide more creative freedom to users more flexibility, such as attaching monetary amounts or images/gifs to ohmies.
