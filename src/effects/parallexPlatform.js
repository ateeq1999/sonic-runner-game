import k from '../kaplayCtx'
import gameSettings from '../utils';

export function platformParallaxFirstFrame() {
    return k.add([
        k.sprite(gameSettings.platform.name),
        k.pos(0, 450),
        k.scale(gameSettings.platform.frames),
    ])
}

export function platformParallaxSecondFrame() {
    return k.add([
        k.sprite(gameSettings.platform.name),
        k.pos(gameSettings.platform.width * gameSettings.platform.frames, 450),
        k.scale(gameSettings.platform.frames),
    ])
}

export function platformUpdate(platformFrames) {
    if (platformFrames[1].pos.x < 0) {
        platformFrames[0].moveTo(platformFrames[1].pos.x + gameSettings.platform.width * gameSettings.platform.frames, 450)
        platformFrames.push(platformFrames.shift())
    }
        
    platformFrames[0].move(-4000, 0)
    platformFrames[1].moveTo(platformFrames[0].pos.x + gameSettings.platform.width * gameSettings.platform.frames, 450)
}

export const parallaxPlatformPeices = [
    platformParallaxFirstFrame(),
    platformParallaxSecondFrame()
]
