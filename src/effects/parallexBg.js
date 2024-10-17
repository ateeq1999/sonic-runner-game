import k from '../kaplayCtx'
import gameSettings from '../utils';

export function bgParallaxFirstFrame() {
    return k.add([
        k.sprite(gameSettings.bg.name),
        k.pos(0, 0),
        k.scale(gameSettings.bg.frames),
        k.opacity(0.8)
    ])
}

export function bgParallaxSecondFrame() {
    return k.add([
        k.sprite(gameSettings.bg.name),
        k.pos(gameSettings.bg.width * gameSettings.bg.frames, 0),
        k.scale(gameSettings.bg.frames),
        k.opacity(0.8)
    ])
}

export function bgUpdate(bgFrames) {
    if (bgFrames[1].pos.x < 0) {
        bgFrames[0].moveTo(bgFrames[1].pos.x + gameSettings.bg.width * gameSettings.bg.frames, 0)
        bgFrames.push(bgFrames.shift())
    }
        
    bgFrames[0].move(-100, 0)
    bgFrames[1].moveTo(bgFrames[0].pos.x + gameSettings.bg.width * gameSettings.bg.frames, 0)
}

export const parallaxBgPeices = [
    bgParallaxFirstFrame(),
    bgParallaxSecondFrame()
]
