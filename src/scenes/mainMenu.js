import k from '../kaplayCtx'
import {bgParallaxFirstFrame, bgParallaxSecondFrame, bgUpdate} from '../effects/parallexBg';
import { platformUpdate, platformParallaxFirstFrame, platformParallaxSecondFrame } from '../effects/parallexPlatform';

export default function mainMenu() {
    if (!k.getData("best-score")) {
        k.setData("best-score", 0);
    }

    k.onButtonPress("jump", () => k.go("game"))

    const bgPeiceWidth = 1920
    const bgPieces = [
        bgParallaxFirstFrame(),
        bgParallaxSecondFrame(),
    ]

    const platformWidth = 1280
    const platforms = [
        platformParallaxFirstFrame(),
        platformParallaxSecondFrame(),
    ]

    k.onUpdate(() => {
        platformUpdate(platforms)
        bgUpdate(bgPieces)
    })
}