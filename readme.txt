-------------------------------------UNDERLINE HOVER EFFECT

.exampleClass {
	display: inline-block;
	position: relative;
	cursor: pointer;
}

  .exampleClass::after {
	content: '';
	position: absolute;
	width: 100%;
	transform: scaleX(0);
	height: 1;
	top: 110%;
	left: 0;
	backgroundColor: white;
	transformOrigin: bottom right;
	transition: transform .4s cubic-bezier(.86,0,.07,1);
  }

  .exampleClass:hover::after {
	transform: scaleX(1);
	transform-origin: bottom left;
  }

---------------------------------------BUTTON ANIMATION 

.exampleClass {
	overflow: hidden;
    padding: 12px 24px;
    border-radius: 7px;
    background-color: white;
    color: black;
    position: relative;
    display: inline-block;
    cursor: pointer;
}

.exampleClass span {
	position: relative;
	transition: color 0.6s cubic-bezier(0.53, 0.21, 0, 1);
},

.exampleClass:before {
	content: "";
	display: block;
	position: absolute;
	top: 0;
	left: 0;
	width: 100%;
	height: 100%;
	background: hsl(244, 63%, 69%);
	transform: scaleX(0);
	transform-origin: 100% 100%;
	transition: transform 0.6s cubic-bezier(0.53, 0.21, 0, 1);
},

.exampleClass:hover::before {
	transform-origin: 0 0;
	transform: scaleX(1);
},

.exampleClass:hover span {
	color: white;
},


    <script src="../Script/waifu-pics.js"></script>
        <link rel="stylesheet" href="../Style/waifu-pics.css">

    <select id="filterSelect">
                <option value="sfw/waifu">Waifu (SFW)</option>
                <option value="sfw/neko">Neko (SFW)</option>
                <option value="sfw/shinobu">Shinobu (SFW)</option>
                <option value="sfw/megumin">Megumin (SFW)</option>
                <option value="sfw/bully">Bully (SFW)</option>
                <option value="sfw/cuddle">Cuddle (SFW)</option>
                <option value="sfw/cry">Cry (SFW)</option>
                <option value="sfw/hug">Hug (SFW)</option>
                <option value="sfw/awoo">Awoo (SFW)</option>
                <option value="sfw/kiss">Kiss (SFW)</option>
                <option value="sfw/lick">Lick (SFW)</option>
                <option value="sfw/pat">Pat (SFW)</option>
                <option value="sfw/smug">Smug (SFW)</option>
                <option value="sfw/bonk">Bonk (SFW)</option>
                <option value="sfw/yeet">Yeet (SFW)</option>
                <option value="sfw/blush">Blush (SFW)</option>
                <option value="sfw/smile">Smile (SFW)</option>
                <option value="sfw/wave">Wave (SFW)</option>
                <option value="sfw/highfive">Highfive (SFW)</option>
                <option value="sfw/handhold">Handhold (SFW)</option>
                <option value="sfw/nom">Nom (SFW)</option>
                <option value="sfw/bite">Bite (SFW)</option>
                <option value="sfw/glomp">Glomp (SFW)</option>
                <option value="sfw/slap">Slap (SFW)</option>
                <option value="sfw/kill">Kill (SFW)</option>
                <option value="sfw/kick">Kick (SFW)</option>
                <option value="sfw/happy">Happy (SFW)</option>
                <option value="sfw/wink">Wink (SFW)</option>
                <option value="sfw/poke">Poke (SFW)</option>
                <option value="sfw/dance">Dance (SFW)</option>
                <option value="sfw/cringe">Cringe (SFW)</option>
                <option value="nsfw/waifu">Waifu (NSFW)</option>
                <option value="nsfw/neko">Neko (NSFW)</option>
                <option value="nsfw/trap">Trap (NSFW)</option>
                <option value="nsfw/blowjob">Blowjob (NSFW)</option>
            </select>