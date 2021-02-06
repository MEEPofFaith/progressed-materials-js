const sentryUnitType = require("libs/unit/sentryUnit");
const register = require("libs/unit/register");

const sentryI = sentryUnitType.sentryUnit("sentry-i");

const cannon = extendContent(Weapon, "large-weapon", {});
cannon.bullet = Bullets.standardHoming;
cannon.rotate = false;
cannon.reload = 13;
cannon.alternate = true;
cannon.x = 16/4;
cannon.y = 9/4;
cannon.recoil = 7/4;
cannon.shootX = -2.5/4;
cannon.ejectEffect = Fx.casing1;
cannon.top = false;

sentryI.weapons.add(cannon);

register(sentryI);