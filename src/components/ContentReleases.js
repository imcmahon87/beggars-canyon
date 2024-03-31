import React, { useEffect } from 'react';
import './Content.css';
import Footer from './Footer';
import releaseVolumeI from '../assets/images/releases-volume-i.jpg';
import releaseVolumeII from '../assets/images/releases-volume-ii.jpg';
import releaseHappiness from '../assets/images/releases-happiness.jpg';
import releaseSilverLining from '../assets/images/releases-silver-lining.jpg';
import releaseBurn from '../assets/images/releases-burn.jpg';
import releaseByYourSide from '../assets/images/releases-by-your-side.jpg';
import releaseMinka from '../assets/images/releases-minka.jpg';
import releaseBlackPuddles from '../assets/images/releases-black-puddles.jpg';

function ContentReleases() {

    useEffect(() => {
        // Track Details Accordion Script
        var acc = document.getElementsByClassName("releaseTrack");
        var i;

        for (i = 0; i < acc.length; i++) {
            acc[i].addEventListener("click", function() {
                this.classList.toggle("active");
                var panel = this.nextElementSibling;
                if (panel.style.maxHeight) {
                panel.style.maxHeight = null;
                } else {
                panel.style.maxHeight = panel.scrollHeight + "px";
                } 
            });
        }
    }, []);

    return (
        <>
            <div id="content">
                <div className="pageHeader">
                    <h2>Albums</h2>
                </div>
                <div className="releaseWrapper">
                    <div className="releaseHeader">
                        <div className="releaseLeft">
                            <img src={releaseVolumeII} />
                        </div>
                        <div className="releaseRight">
                            <div className="releaseRightTop">
                                <h2>Volume II</h2>
                                <h2>2023</h2>
                            </div>
                            <p>
                                In their sophomore release, Beggars Canyon matures their repertoire into increasingly
                                cultivated stories featuring graceful melodies and tight vocal harmonies.
                                Spanning ten tales of love and loss, this often self reflective and always intoxicating album 
                                is not one to miss.
                            </p>
                        </div>
                    </div>
                    <div className="releaseDetails">
                        <div className="releaseTrack">
                            <h5>Silver Lining</h5>
                            <h5>3:47</h5>
                        </div>
                        <div className="trackLyrics">
                            <p>
                                Ladies and gents come to my feet
                                Listen once so I don't have to repeat
                                Well it's a cold, hard world we live in
                                And when you die you may find
                                No peace of mind
                                No pearly gates
                                No silver lining
                                Just dirt on a box
                                In a hole in the ground
                                'Till you're rotten on the day
                                They bury your corpse
                                After the shame and all the remorse
                                Most of them won't see you again
                                Unless you're lucky with love
                                <br /><br />
                                Breaking your back until the end of your days
                                Working now to leave enough time to play
                                Passing down the torch of your youth
                                And watch it all go to waste
                                Just like the way you wasted your own
                                You spent your years to turn a house to a home
                                When it all starts fading away
                                You'll learn you die all alone
                                And on the day they bury your corpse
                                After the pain and all the discourse
                                No one left will fight for your love
                                Unless your death was in vain
                            </p>
                        </div>
                        <hr />
                        <div className="releaseTrack">
                            <h5>Happiness</h5>
                            <h5>2:44</h5>
                        </div>
                        <div className="trackLyrics">
                            <p>
                                Well no one wants to be a liar
                                But sometimes you should
                                And I don't want my name in stone
                                I'd rather write in blood
                                The simple joys in life
                                Are never quite as they may seem
                                That's why happiness is not for me
                                <br /><br />
                                And I am not a complex man
                                A holy man's son
                                Like Jesus Christ I cured the lame
                                By the Devil when I'm done
                                I drink and fight all through the night
                                I turn water into wine
                                That's why happiness is never mine
                                <br /><br />
                                Salvation's for the best of man
                                A better man than I
                                And I will be in Hell
                                With the Devil when I die
                                Saint Peter don't you call me
                                'Cause I know where I stand
                                That's why happiness ain't in my hands
                                Yeah, that's why happiness ain't in my hands
                                <br /><br />
                                Hey!
                                <br /><br />
                                Salvation's for the best of man
                                No better man than I
                                And I will be in Hell
                                With the Devil when I die
                                Saint Peter don't you call me
                                'Cause I know where I stand
                                That's why happiness ain't in my hands
                                Yeah, that's why happiness ain't in my hands
                                Yeah, that's why happiness ain't in my hands
                            </p>
                        </div>
                        <hr />
                        <div className="releaseTrack">
                            <h5>Devil's Due</h5>
                            <h5>3:58</h5>
                        </div>
                        <div className="trackLyrics">
                            <p>
                                Coming down's the hardest thing
                                When the lights fall from the stage
                                There ain't no more songs to sing
                                Settle down to the barstool
                                Sink into this drink
                                The night it never lasts
                                Just as long as you may think
                                <br /><br />
                                Wood and the wires
                                Songs of love and loss
                                Songs will take you higher
                                From the bottom of the barrel
                                To the angels up on high
                                Deep down in the mud
                                Consumed by Satan's fire
                                <br /><br />
                                And I bed that hell
                                It's just an empty stage
                                No water, no wine
                                No Satan down the line
                                Comin' on through
                                Give the Devil his due
                                <br /><br />
                                Cold in the mind
                                Sadness we contain in
                                All our hearts burn in desire
                                Pluck the note and find the key
                                Building out the song
                                The crowd inside your head
                                They sway and sing along
                                <br /><br />
                                But I bed the hell
                                It just an empty stage
                                No water, no wine
                                No Satan down the line
                                Comin' on through
                                Give the Devil his due
                                <br /><br />
                                Coming down's the hardest thing
                                When the lights fall from the stage
                                There ain't no more songs to sing
                                Settle down to the barstool
                                Sink into this drink
                                The night it never lasts
                                Just as long as you may think
                            </p>
                        </div>
                        <hr />
                        <div className="releaseTrack">
                            <h5>Salt</h5>
                            <h5>4:06</h5>
                        </div>
                        <div className="trackLyrics">
                            <p>
                                Salt on your lips
                                And dust in your eye
                                The gift of the desert
                                Where the river dies
                                You're gonna drag your drying skin
                                At the western horizon
                                Had everything that gold could lend
                                But an empty hearse
                                And heartless friends
                                Soon as troubles blew your way
                                You leave them alone
                                <br /><br />
                                Ain't no stone you can turn
                                To find forsaken love
                                Every choice has its price
                                Paid in time or paid in blood
                                You best know when you throw
                                Your life away for fortune's grown
                                You're gonna reap exactly what you sow
                                <br /><br />
                                When you first split the earth
                                It was lucious and still forgave
                                Until you burnt the mountains bare
                                The air a thousand razor blades
                                Your careless course
                                The shovels digging deep in the grave
                                How quick the town became a tomb
                                How quick the tomb became a plain
                                Plain as day, your greed was shown
                                The seed was sown
                                They curse your name
                                How quick the books
                                There were thrown
                                And you were driven from your door
                                If we all get what we deserve
                                I hope that curse still haunts you more
                                <br /><br />
                                'Cause ain't no stone you can turn
                                To find forsaken love
                                Every choice has its price
                                You best know when you throw
                                Your life away for fortune's grown
                                You're gonna reap exactly what you sow
                                <br /><br />
                                Yeah, you best know when you throw
                                Your life away for fortune's grown
                                You're gonna reap exactly what you sow
                            </p>
                        </div>
                        <hr />
                        <div className="releaseTrack">
                            <h5>Burn</h5>
                            <h5>5:29</h5>
                        </div>
                        <div className="trackLyrics">
                            <p>
                                Ooh, ooh
                                Ooh, ooh
                                The sun went black
                                And the moon did rise
                                Those coyotes wait in the darkest of times
                                My hands are shaking
                                That bottle's run dry
                                My eyes are heavy
                                From getting another sleepless night
                                Behold a pale horse
                                Hell follows close behind
                                Death rides atop him
                                The end times to be his bride
                                <br /><br />
                                How long must I go
                                'Till I can not return?
                                Through Hell, Lord I'll walk
                                I'm still gonna burn
                                And I ain't worth saving
                                I'm just a sinner that's lost his way
                                I've made the bed that I'll lay in
                                And it's here I'll wait 'till Judgement Day
                                <br /><br />
                                How long must I go
                                'Till I can not return?
                                Through Hell, Lord I'll walk
                                I'm still gonna burn
                                <br /><br />
                                The sun went black
                                And the moon did rise
                                Those coyotes wait in the dark
                                Of these dark times
                            </p>
                        </div>
                        <hr />
                        <div className="releaseTrack">
                            <h5>The Ballad of Dr. Sweet</h5>
                            <h5>4:28</h5>
                        </div>
                        <div className="trackLyrics">
                            <p>
                                Dr. Sweet bought a house on Garland Street
                                Then proudly moved his family to that house on Garland Street
                                Proudly moved his family to that house on Garland Street
                                He proudly moved his family to that house
                                A smart man, he armed himself against the Klan
                                When those motherfuckers showed he was prepared to take a stand
                                When those motherfuckers showed he was prepared to take a stand
                                When those motherfuckers showed he was prepared
                                The sun down and the crowd was all around
                                The shattered glass began to crash as rocks began to pound
                                And all he done was buy a house on Garland Street
                                Then proudly moved his family to that house on Garland Street
                                <br /><br />
                                And the shots they did ring out
                                And the bigots, they dropped to the ground
                                While the police stood by, failed to intervene
                                Or acknowledge the threat to Sweet's life
                                <br /><br />
                                What of Gladys and the baby?
                                Huddled in the attic praying for their lives
                                While the crowd closed in, resolved to put them out
                                Until the rifle fire cracked through the night
                                <br /><br />
                                Inspector Norton stood upon the witness stand
                                Claiming no crowd was in the street
                                No malice at hand
                                And though the jury saw straight through his bullshit lie
                                It made no difference, for the family Sweet lives
                                <br /><br />
                                And the shots they did ring out
                                And the bigots, they dropped to the ground
                                Somehow the only arrest that were made that night
                                Were of Dr. Sweet, Gladys, and child
                                <br /><br />
                                What of Gladys and the baby?
                                As they wavered out their trial
                                While the police stood by, failed to intervene
                                Until Gladys and her baby both died
                                <br /><br />
                                Dr. Sweet lost the house on Garland Street
                                What really got him down was how he lost his family
                                Without Gladys and the baby
                                He seemed to lose all meaning in his life
                                So with the curtains drawn, he pulled the pistol from his case
                                And put a bullet in his head late one night
                                <br /><br />
                                Dr. Sweet bought a house on Garland Street
                                And then proudly moved his family to that house on Garland Street
                            </p>
                        </div>
                        <hr />
                        <div className="releaseTrack">
                            <h5>Intentions</h5>
                            <h5>5:20</h5>
                        </div>
                        <div className="trackLyrics">
                            <p>
                                Words never hurt my feelings
                                Its the intention that kills my pride
                                And the lies that set me
                                Free from the shackles of the notion
                                Falling through space and time
                                Oh the stars how they do shine
                                Swimming in the sea of regression
                                To remember all the shitty, fucked up things
                                That you've done to me
                                Stuck in a loop
                                With nowhere to reboot myself
                                Circling over and over and over again
                                <br /><br />
                                I've been away for far too long
                                And I've unaware for far too much longer still
                                It gives me the chills my friend
                                But you won't see me again
                                This is the end of us
                                And I'm calling it quits
                                But you never did have a worry
                                <br /><br />
                                Sown into this weave of deception
                                You can almost hear the wheels as they grind
                                As your mind ceases to be free
                                Your actions, your words, and your behavior
                                And our late night talks on the telephone
                                When you'd tell me that you're all alone
                                I know its a lie that you're telling me
                                And I know its wrong to be unkind
                                But you've heard me one too many times
                                Breaking free from this loop in time
                                Just to recite my life
                                Back to you over and over and over again
                                <br /><br />
                                I've been away for far too long
                                And I've unaware for far too much longer still
                                It gives me the chills my friend
                                But you won't see me again
                                This is the end of us
                                And I'm calling it quits
                                <br /><br />
                                Ooooh, ooooh, ooooh
                                Ooooh, ooooh, ooooh
                                Ooooh, ooooh, ooooh
                                Ooooh, ooooh, ooooh
                            </p>
                        </div>
                        <hr />
                        <div className="releaseTrack">
                            <h5>Blind</h5>
                            <h5>4:12</h5>
                        </div>
                        <div className="trackLyrics">
                            <p>
                                Maybe I was never meant to be the man
                                I wanted you to see in me
                                I opened up my heart
                                Told my story from the start
                                And you denied me
                                Maybe I will always be
                                The nice boy you've labeled me
                                I am so terribly out of touch with life
                                But this pain you can't deny me
                                <br /><br />
                                It's been a long time
                                Since we lost in each other's eyes
                                And each other's lies
                                I'm beginning now to see
                                What we might have been and where we'd be
                                It's in the past now
                                Where it should be
                                <br /><br />
                                Wrap me up in a paper bag
                                Drink me down and don't look back
                                I wish you'd choke on every word you've said
                                And every time you placed a bet to please your ego
                                <br /><br />
                                Was it all just a lie?
                                Did you cry?
                                Was I that blind?
                                <br /><br />
                                This song and dance we call romance
                                Gives you and I a second chance to see
                                What's truly in our hearts
                                What we fear when we're apart
                                And why we're angry
                                The trouble is with love you see
                                That fear and boredom look the same
                                And so we crack when we fail to see the signs
                                And we come out swinging blind because we're lonely
                                <br /><br />
                                It's been a long time
                                Since we lost in each other's eyes
                                And each other's lies
                                I'm beginning now to see
                                What we might have been and where we'd be
                                It's in the past now
                                Where it should be
                                <br /><br />
                                Was it all just a lie?
                                Did you cry?
                                Was I that blind?
                            </p>
                        </div>
                        <hr />
                        <div className="releaseTrack">
                            <h5>Letter in a Waltz</h5>
                            <h5>4:27</h5>
                        </div>
                        <div className="trackLyrics">
                            <p>
                                I sat down to write you a letter
                                But my mind was fried
                                The inkwell was running dry
                                So I wrote down the words
                                That I thought that I wanted to say
                                It's a shame
                                Who's to blame?
                                Is it me?
                                <br /><br />
                                Sweet time please bring me
                                To the end of my pain
                                Let my tears dry
                                Like the sun on the rain
                                The harder the storm blows
                                The wind at my door
                                My foundation was starting to shake
                                <br /><br />
                                I drove myself wild
                                I hardly could smile
                                Though I tried
                                Imagination to retold all my pride
                                So I wrote down the words
                                That I knew that I never could say
                                But then I got them
                                Though I threw them away
                                <br /><br />
                                Sweet time please bring me
                                To the end of my pain
                                Let my tears dry
                                Like the sun on the rain
                                The harder the storm blows
                                The wind at my door
                                My foundation was starting to shake
                                <br /><br />
                                Sweet time please bring me
                                To the end of my pain
                                Let my tears dry
                                Like the sun on the rain
                                The harder the storm blows
                                The wind at my door
                                Oh my foundation was starting to shake
                                <br /><br />
                                Sweet time please bring me
                                To the end of my pain
                                Let my tears dry
                                Like the sun on the rain
                                The harder the storm blows
                                The wind at my door
                                My foundation was starting to shake
                                Oh my foundation was starting to shake
                            </p>
                        </div>
                        <hr />
                        <div className="releaseTrack">
                            <h5>High Road</h5>
                            <h5>6:42</h5>
                        </div>
                        <div className="trackLyrics">
                            <p>
                                Walk on the sun, you're bound to get burned
                                Stay on the ground, never have the will to run
                                <br /><br />
                                Yeah it's a fine line so it seems
                                How this mix is in between
                                You take the high road to nowhere
                                Living the dream
                                You take the high road to nowhere
                                Living the dream
                                The clothes on my back
                                Oh, they're tearing at the seams
                                One mile down, another thousand to go
                                Trying to shake loose this heavy load
                                You take the high road to nowhere
                                Take it slow
                                <br /><br />
                                Breaking your back, you're counting the days
                                That old clock's winding down
                                Gone like yesterday
                                <br /><br />
                                Yeah it's a fine line so it seems
                                How this mix is in between
                                You take the high road to nowhere
                                Living the dream
                                You take the high road to nowhere
                                Living the dream
                                The clothes on my back
                                Oh, they're tearing at the seams
                                One mile down, another thousand to go
                                Trying to shake loose this heavy load
                                You take the high road to nowhere
                                Take it slow
                                <br /><br />
                                You take the high road to nowhere
                                Take it slow
                                <br /><br />
                                You take the high road to nowhere
                                Take it slow
                                You take the high road to nowhere
                                Take it slow
                            </p>
                        </div>
                    </div>
                </div>
                <div className="releaseWrapper">
                    <div className="releaseHeader">
                        <div className="releaseLeft">
                            <img src={releaseVolumeI} />
                        </div>
                        <div className="releaseRight">
                            <div className="releaseRightTop">
                                <h2>Volume I</h2>
                                <h2>2018</h2>
                            </div>
                            <p>
                                From the chain-rattling opening of Withered to the stoned crooning of High; from the wanderlust 
                                expansion of a timeless classic in Twinkle, Twinkle to the drunken anarchy of The Curse; or from the 
                                delicious dissonance of Witchcraft to the chill-inducing beauty of the album's magnum opus, the 
                                flawless Such a Fool, this album contains more heart, creativity, intelligence, and genuine love 
                                of music than any other of the year.
                            </p>
                        </div>
                    </div>
                    <div className="releaseDetails">
                        <div className="releaseTrack">
                            <h5>Withered</h5>
                            <h5>3:57</h5>
                        </div>
                        <div className="trackLyrics">
                            <p>
                                Lord child have you done no wrong this world has left you bitter, broken, and alone
                                Hey now babe can't you see what you've done a broken heart left bleeding and it's not the only one
                                <br /><br />
                                A woman once so beautiful now withers away and the siren sings her final song as darkness turns to day
                                <br /><br />
                                (Chorus)
                                <br /><br />
                                Sing your final victory song into every broken home
                                <br /><br />
                                (Chorus)
                                <br /><br />
                                All the cold night long. Cries in the dark I am alone
                                A woman once so beautiful now withers away and the siren sings her final song as darkness turns to day
                            </p>
                        </div>
                        <hr />
                        <div className="releaseTrack">
                            <h5>When He Fell from Heaven</h5>
                            <h5>3:18</h5>
                        </div>
                        <div className="trackLyrics">
                            <p>
                                Gabriel wanted to stay there. Old nick wanted to go
                                He just wants to be a misconception that nobody will know
                                He's just got to get himself away
                                Running like the devil. Temptation in his soul
                                Taken on the wings of fallen angels, carry him on down
                                Yes it was his final judgement day
                                <br /><br />
                                (Chorus)
                                <br /><br />
                                When he fell from heaven to get himself a piece of the pie
                                Yes he fell from heaven to get himself a piece of the pie
                                <br /><br />
                                Eternal grace forgotten by forlorned shame and fate
                                A fiery throne made of sinners bones turned away from heavens gates
                                Forever damned to build upon his hate
                                Steadfast with intention to build his empire high
                                Rising for his name and for his nation and fighting for his pride
                                Yes it was his final judgment day
                                <br /><br />
                                (Chorus)
                                <br /><br />
                                With reckoning upon them the angels stand their ground
                                The beating drums and the smell of sulfer rising from the sound
                                Now is not the time to turn away
                                Onward in to battle. For years and years they play
                                A game of chess that has no end and no one walks away
                                Yes it was their final judgement day
                            </p>
                        </div>
                        <hr />
                        <div className="releaseTrack">
                            <h5>Twinkle, Twinkle</h5>
                            <h5>3:15</h5>
                        </div>
                        <div className="trackLyrics">
                            <p>
                                Twinkle twinkle little star how I wonder what you are
                                Up above the world so high like a diamond in the sky
                                When the blazing sun is gone when he nothing shines upon
                                Then you show your little light twinkle twinkle all the night
                                <br /><br />
                                (Chorus)
                                <br /><br />
                                Then the traveler in the dark
                                Thanks you for your tiny spark
                                He could not see where to go
                                If you did not twinkle so
                                <br /><br />
                                In the dark blue sky you keep and often through my curtains peep
                                For you never shut your eye till the sun is in the sky
                                As your bright and tiny spark lights the traveler in the dark
                                Though I know not what you are twinkle twinkle little star
                                <br /><br />
                                (Chorus)
                                <br /><br />
                                Twinkle twinkle little star how I wonder what you are
                                Up above the world so high like a diamond in the sky
                                When the blazing sun is gone when he nothing shines upon
                                Then you show your little light twinkle twinkle all the night
                            </p>
                        </div>
                        <hr />
                        <div className="releaseTrack">
                            <h5>High</h5>
                            <h5>2:54</h5>
                        </div>
                        <div className="trackLyrics">
                            <p>
                                High, high as a kite I will fly away. Low as the rock that I've hit
                                It's an inevitable feeling an irrevocable dealing of the cards
                                And I'm just laying here praying you'll tell me it's hard
                                Harder than it seems
                                <br /><br />
                                To know myself is my greatest disease. To fear all the things I don't know. (I don't wanna know)
                                Like a wayfairing stranger or a lamb in a manger I'm scorned
                                And I'm just sitting here staring and bearing the norm
                                <br /><br />
                                Sing high, high and away
                                Sing high, high and away
                                Sing high, high and away
                                Sing high, high and away
                            </p>
                        </div>
                        <hr />
                        <div className="releaseTrack">
                            <h5>Witchcraft</h5>
                            <h5>3:35</h5>
                        </div>
                        <div className="trackLyrics">
                            <p>
                                When she lit that match a smile lit up her face
                                They called it cruel witchcraft and burned her at the stake
                                <br /><br />
                                Their eyes fixed on her form as the flames rose to her feet
                                Their nostrils opened wide at the smell of burning hair and meat
                                But she was the cruel one, She was the cruel one
                                She was the cruel one and the crowd were the voice of the justice
                                For they were the wise ones, Yes the crowd were the wise ones
                                They were the wise ones the priest had told them so
                                <br /><br />
                                She knocked at his front door at a time of desperate need
                                The lords light shone off of his cross as his lips drew a smile that bore his bloody teeth
                                <br /><br />
                                But he was the good one, yes the priest was the good one
                                He was the good one the lords light in his heart
                                And the town thanked him so kind, yes they all thanked him so kind
                                The town thanked him so kind for keeping the devil away
                            </p>
                        </div>
                        <hr />
                        <div className="releaseTrack">
                            <h5>The Curse</h5>
                            <h5>2:50</h5>
                        </div>
                        <div className="trackLyrics">
                            <p>
                                Set fire to the whole damn town we're gonna burn it to the ground
                                Salt the earth, let the locusts rain. My unholy Plague
                                The priest had lied, yeah a good woman died now you all pay the price
                                A curse upon your bloodlines until the last one dies out
                                <br /><br />
                                OOOOOooohhhhhh…
                                <br /><br />
                                There will be hell to pay
                                Hell to pay x3
                                <br /><br />
                                Ground shakes, the earth she quakes the trees are all aglow
                                Flesh boils, a wretched smell from the depths below
                                A crooked smile billows in the smoke horrendous shrieks approach
                                The witch cried out into the night “there will be hell to pay”
                                <br /><br />
                                (Screams)
                                <br /><br />
                                There will be hell to pay (over and over and over and over)
                            </p>
                        </div>
                        <hr />
                        <div className="releaseTrack">
                            <h5>Too Far Gone</h5>
                            <h5>3:17</h5>
                        </div>
                        <div className="trackLyrics">
                            <p>
                                Night and day, I'm gone. Noone's home but the television's on
                                Drown my sins in a bottle of gin just another second I'll be at it again
                                I'm out at night, high as a kite. Waiting on some kind of guiding light
                                I've been on my knees, praying “Please, Lord I'm just looking for some kind of release”
                                <br /><br />
                                (Chorus)
                                <br /><br />
                                Singing “Lord, Lord I'm too far gone” X2
                                <br /><br />
                                Find my way by the neon lights, sweet salvation in the dead of night
                                Swerving toward those pearly gates, oh the bar outside of town won't let me get there safe
                                I've known for far too long, I can't keep it up cause I'm too far gone
                                So pour us just another round I swear it's my last till tomorrow rolls round'
                                <br /><br />
                                (Chorus) X4
                            </p>
                        </div>
                        <hr />
                        <div className="releaseTrack">
                            <h5>Pleasure for Pain</h5>
                            <h5>2:49</h5>
                        </div>
                        <div className="trackLyrics">
                            <p>
                                Emotion like time as it passes us by will wither and fade and change day to day
                                All the while we will wait and pray that pains are taken by our pleasures though they're one in the same
                                Like downtrodden lovers renewed in the spring will nestle together when round comes the fall
                                The moments will pass though a moment may stall and the face in the mirror will be quiet and cold
                                <br /><br />
                                (Chorus)
                                <br /><br />
                                Cause you know gold is never as valuable as you want it to be and that final breath well it ain't as sweet as you need
                                It's been told that nobody finds their way to a better place without a little strain in their lives every day
                                In this cold the rain will turn to snow swirling in the breeze and melt away in the spring
                                <br /><br />
                                So play like a child and love while you can for love in return is supplied by demand
                                If giving for pleasure is giving to gain then we're giving for pleasure to understand pain
                                At the end of our time when it circles around I pray when we're buried deep in the ground
                                That I made you feel loved and like children we played
                                Giving for pleasure to understand pain
                                <br /><br />
                                (Chorus)
                            </p>
                        </div>
                        <hr />
                        <div className="releaseTrack">
                            <h5>Such a Fool</h5>
                            <h5>4:06</h5>
                        </div>
                        <div className="trackLyrics">
                            <p>
                                Calling out his name she runs from the bedroom crying again
                                Holding signs of love coming to an end as he stares on with no remorse
                                Stalling in the doorway he tries to pull her close as she slips from his embrace
                                She turns to leave but then pauses just to say a final thought
                                <br /><br />
                                (Chorus)
                                <br /><br />
                                Play your little games cause the world doesn't play by your rules
                                And Oh, it's such a shame to be played by such a fool
                                To be played by such a fool
                                <br /><br />
                                Now that she is gone she's watching him grow was it right to let him go
                                Could she go back to the way it used to be? Give it one more shot and wait to flee
                                Passing over time she is sprung on old love and the feelings will die
                                Forever wise as she screams into the night with a vengeance
                                (Chorus)
                                <br /><br />
                                (Bridge)
                                <br /><br />
                                Darling you will see. Darling you will see the light
                                In the darkness of the night
                                (Chorus)
                            </p>
                        </div>
                    </div>
                </div>
                <div className="pageHeader">
                    <h2>Singles</h2>
                </div>
                <div className="releaseWrapper">
                    <div className="releaseHeader">
                        <div className="releaseLeft">
                            <img src={releaseHappiness} />
                        </div>
                        <div className="releaseRight">
                            <div className="releaseRightTop">
                                <h2>Happiness</h2>
                                <h2>2023</h2>
                            </div>
                            <div className="releaseDetails">
                                <div className="releaseTrack">
                                    <h5>Display Lyrics</h5>
                                </div>
                                <div className="trackLyrics singleLyrics">
                                    <p>
                                        Well no one wants to be a liar
                                        But sometimes you should
                                        And I don't want my name in stone
                                        I'd rather write in blood
                                        The simple joys in life
                                        Are never quite as they may seem
                                        That's why happiness is not for me
                                        <br /><br />
                                        And I am not a complex man
                                        A holy man's son
                                        Like Jesus Christ I cured the lame
                                        By the Devil when I'm done
                                        I drink and fight all through the night
                                        I turn water into wine
                                        That's why happiness is never mine
                                        <br /><br />
                                        Salvation's for the best of man
                                        A better man than I
                                        And I will be in Hell
                                        With the Devil when I die
                                        Saint Peter don't you call me
                                        'Cause I know where I stand
                                        That's why happiness ain't in my hands
                                        Yeah, that's why happiness ain't in my hands
                                        <br /><br />
                                        Hey!
                                        <br /><br />
                                        Salvation's for the best of man
                                        No better man than I
                                        And I will be in Hell
                                        With the Devil when I die
                                        Saint Peter don't you call me
                                        'Cause I know where I stand
                                        That's why happiness ain't in my hands
                                        Yeah, that's why happiness ain't in my hands
                                        Yeah, that's why happiness ain't in my hands
                                    </p>
                        </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="releaseWrapper">
                    <div className="releaseHeader">
                        <div className="releaseLeft">
                            <img src={releaseSilverLining} />
                        </div>
                        <div className="releaseRight">
                            <div className="releaseRightTop">
                                <h2>Silver Lining</h2>
                                <h2>2023</h2>
                            </div>
                            <div className="releaseDetails">
                                <div className="releaseTrack">
                                    <h5>Display Lyrics</h5>
                                </div>
                                <div className="trackLyrics singleLyrics">
                                    <p>
                                        Ladies and gents come to my feet
                                        Listen once so I don't have to repeat
                                        Well it's a cold, hard world we live in
                                        And when you die you may find
                                        No peace of mind
                                        No pearly gates
                                        No silver lining
                                        Just dirt on a box
                                        In a hole in the ground
                                        'Till you're rotten on the day
                                        They bury your corpse
                                        After the shame and all the remorse
                                        Most of them won't see you again
                                        Unless you're lucky with love
                                        <br /><br />
                                        Breaking your back until the end of your days
                                        Working now to leave enough time to play
                                        Passing down the torch of your youth
                                        And watch it all go to waste
                                        Just like the way you wasted your own
                                        You spent your years to turn a house to a home
                                        When it all starts fading away
                                        You'll learn you die all alone
                                        And on the day they bury your corpse
                                        After the pain and all the discourse
                                        No one left will fight for your love
                                        Unless your death was in vain
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="releaseWrapper">
                    <div className="releaseHeader">
                        <div className="releaseLeft">
                            <img src={releaseBurn} />
                        </div>
                        <div className="releaseRight">
                            <div className="releaseRightTop">
                                <h2>Burn</h2>
                                <h2>2023</h2>
                            </div>
                            <div className="releaseDetails">
                                <div className="releaseTrack">
                                    <h5>Display Lyrics</h5>
                                </div>
                                <div className="trackLyrics singleLyrics">
                                    <p>
                                        Ooh, ooh
                                        Ooh, ooh
                                        The sun went black
                                        And the moon did rise
                                        Those coyotes wait in the darkest of times
                                        My hands are shaking
                                        That bottle's run dry
                                        My eyes are heavy
                                        From getting another sleepless night
                                        Behold a pale horse
                                        Hell follows close behind
                                        Death rides atop him
                                        The end times to be his bride
                                        <br /><br />
                                        How long must I go
                                        'Till I can not return?
                                        Through Hell, Lord I'll walk
                                        I'm still gonna burn
                                        And I ain't worth saving
                                        I'm just a sinner that's lost his way
                                        I've made the bed that I'll lay in
                                        And it's here I'll wait 'till Judgement Day
                                        <br /><br />
                                        How long must I go
                                        'Till I can not return?
                                        Through Hell, Lord I'll walk
                                        I'm still gonna burn
                                        <br /><br />
                                        The sun went black
                                        And the moon did rise
                                        Those coyotes wait in the dark
                                        Of these dark times
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="releaseWrapper">
                    <div className="releaseHeader">
                        <div className="releaseLeft">
                            <img src={releaseByYourSide} />
                        </div>
                        <div className="releaseRight">
                            <div className="releaseRightTop">
                                <h2>By Your Side</h2>
                                <h2>2022</h2>
                            </div>
                            <div className="releaseDetails">
                                <div className="releaseTrack">
                                    <h5>Display Lyrics</h5>
                                </div>
                                <div className="trackLyrics singleLyrics">
                                    <p>
                                        Well you called so I made you a promise
                                        I'd come back to hold you and kiss you
                                        As soon as I could
                                        Now here I am on the bridge that you threw yourself over
                                        Wondering if I should follow
                                        If I even could
                                        <br /><br />
                                        Its not like I'm trying to die
                                        I just miss you inside
                                        <br /><br />
                                        I walked home in the darkness
                                        Avoiding every light I saw
                                        Along the way
                                        Held my head high and tried so goddamn hard not to cry
                                        And as night turned to day my pain left me nowhere to hide
                                        <br /><br />
                                        And I never believed I was always
                                        Right by your side
                                        <br /><br />
                                        It's not like I'm trying to hide
                                        I just miss you inside
                                        And I never believed I was always
                                        Right by your side
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="releaseWrapper">
                    <div className="releaseHeader">
                        <div className="releaseLeft">
                            <img src={releaseMinka} />
                        </div>
                        <div className="releaseRight">
                            <div className="releaseRightTop">
                                <h2>Minka</h2>
                                <h2>2021</h2>
                            </div>
                            <div className="releaseDetails">
                                <div className="releaseTrack">
                                    <h5>Display Lyrics</h5>
                                </div>
                                <div className="trackLyrics singleLyrics">
                                    <p>
                                        Mama please this feels strange to me
                                        Papa was mean when he said to me
                                        “Stand tall and lean. Smile for all to see.”
                                        Pulled me by the wrist as he walked me to the door. x4
                                        <br /><br />
                                        Papa, dear, why did you betray?
                                        I knew mama would let me down someday
                                        I so innocent and he so strange
                                        He drove me insane x3
                                        HE DROVE ME FUCKING INSANE!
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="releaseWrapper">
                    <div className="releaseHeader">
                        <div className="releaseLeft">
                            <img src={releaseBlackPuddles} />
                        </div>
                        <div className="releaseRight">
                            <div className="releaseRightTop">
                                <h2>Black Puddles</h2>
                                <h2>2018</h2>
                            </div>
                            <div className="releaseDetails">
                                <div className="releaseTrack">
                                    <h5>Display Lyrics</h5>
                                </div>
                                <div className="trackLyrics singleLyrics">
                                    <p>
                                        Black Puddles they glimmer between the cracked and decayed cobble stones
                                        He sought out the darker the less crowded streets as he wandered this new town alone
                                        <br /><br />
                                        A light rain fell x2
                                        <br /><br />
                                        He wandered in circles until finally the whole of his mind had been stung
                                        By a sensation so like suffering. So pungent he could taste it on the tip of his tongue
                                        And he walked down a dark stairwell
                                        <br /><br />
                                        And the music it hushed at the sight of this stranger, who faced new bizarre company
                                        Well he spent all his time fighting wars in his mind with anxiety, fear, and a longing to be
                                        But the man on the accordion simply stared, the smile on his face loath to see
                                        He cut off the lively dance number he played, for a dusty old tune from a lost century
                                        <br /><br />
                                        And the music it hushed at the sight of this stranger, who faced new bizarre company
                                        Well he spent all his time fighting wars in his mind with anxiety, fear, and a longing to be
                                        But the man on the accordion simply stared, the smile on his face loath to see
                                        He cut off the lively dance number he played, for a dusty old tune from a lost century
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </>
    );
}

export default ContentReleases;