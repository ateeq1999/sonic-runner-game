import k from '../kaplayCtx'
import {bgParallaxFirstFrame, bgParallaxSecondFrame, bgUpdate} from '../effects/parallexBg';
import { platformUpdate, platformParallaxFirstFrame, platformParallaxSecondFrame } from '../effects/parallexPlatform';
import { makeSonic } from '../entities/sonic';

export default function mainMenu() {
    if (!k.getData("best-score")) {
        k.setData("best-score", 0);
    }

    k.onButtonPress("jump", () => k.go("game"))

    const bgPieces = [
        bgParallaxFirstFrame(),
        bgParallaxSecondFrame(),
    ]

    const platforms = [
        platformParallaxFirstFrame(),
        platformParallaxSecondFrame(),
    ]

    k.add([
        k.text("SONIC RING RUN", { font: "mania", size: 96 }),
        k.pos(k.center().x, 200),
        k.anchor("center")
    ])

    k.add([
        k.text("Press Space/Click/Touch To Play", { font: "mania", size: 32 }),
        k.pos(k.center().x, k.center().y - 200),
        k.anchor("center")
    ])

    const sonic = makeSonic(k.vec2(200, 745))

    k.onUpdate(() => {
        platformUpdate(platforms, 4000)
        bgUpdate(bgPieces)
    })
}