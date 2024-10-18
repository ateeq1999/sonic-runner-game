import { bgParallaxFirstFrame, bgParallaxSecondFrame, bgUpdate } from '../effects/parallexBg'
import { platformParallaxFirstFrame, platformParallaxSecondFrame, platformUpdate } from '../effects/parallexPlatform'
import { makeMotobug } from '../entities/motobug'
import { makeRing } from '../entities/ring'
import { makeSonic } from '../entities/sonic'
import k from '../kaplayCtx'
import gameSettings from '../utils'

export default function game() {
    k.setGravity(3100)

    const bgPieces = [
        bgParallaxFirstFrame(),
        bgParallaxSecondFrame(),
    ]

    const platforms = [
        platformParallaxFirstFrame(),
        platformParallaxSecondFrame(),
    ]

    let score = 0
    let scoreMultiplier = 0

    const scoreText = k.add([
        k.text(`SCORE : ${score}`, { font: "mania", size: 72 }),
        k.pos(20, 20),
    ])

    let gameSpeed = 300

    k.loop(1, () => {
        gameSpeed += 50
    })

    k.add([
        k.rect(1920, 300),
        k.opacity(0),
        k.area(),
        k.pos(0, 832),
        k.body({ isStatic: true }),
    ])

    const sonic = makeSonic(
        k.vec2(
            gameSettings.sonic.pos.start.x,
            gameSettings.sonic.pos.start.y,
        )
    )

    sonic.setControls()
    sonic.setEvents()
    sonic.onCollide("enemy", (enemy) => {
        if (!sonic.isGrounded()) {
            k.play("destroy", { volume: 0.5 })
            k.play("hyper-ring", { volume: 0.5 })
            k.destroy(enemy)
            sonic.play("jump")
            sonic.jump()
            spawnMotoBug()
            return
        }

        k.play("hurt", { volume: 0.5 })
        k.go("game-over")
    })
    sonic.onCollide("ring", (ring) => {
        k.play("ring", { volume: 0.5 })
        k.destroy(ring)
        score++
        scoreText.text = `SCORE : ${score}`
    })

    const spawnMotoBug = () => {
        const motobug = makeMotobug(k.vec2(1900, 773))

        motobug.onUpdate(() => {
            if (gameSpeed < 3000) {
                motobug.move(-(gameSpeed + 300), 0)
                return
            }

            motobug.move(-gameSpeed, 0)
        })

        motobug.onExitScreen(() => {
            if (motobug.pos.x < 0) k.destroy(motobug);

            const waitTime = k.rand(0.5, 3)

            k.wait(waitTime, spawnMotoBug)
        })
    }

    spawnMotoBug()

    const spawnRing = () => {
        const ring = makeRing(k.vec2(1950, 745));
        
        ring.onUpdate(() => {
            ring.move(-gameSpeed, 0);
        });

        ring.onExitScreen(() => {
            if (ring.pos.x < 0) k.destroy(ring);
        });

        const waitTime = k.rand(0.5, 3);

        k.wait(waitTime, spawnRing);
    };

    spawnRing();

    k.onUpdate(() => {
        platformUpdate(platforms, gameSpeed)
        bgUpdate(bgPieces)
    })
}