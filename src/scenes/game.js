import { bgParallaxFirstFrame, bgParallaxSecondFrame, bgUpdate } from '../effects/parallexBg'
import { platformParallaxFirstFrame, platformParallaxSecondFrame, platformUpdate } from '../effects/parallexPlatform'
import { makeMotobug } from '../entities/motobug'
import { makeRing } from '../entities/ring'
import { makeSonic } from '../entities/sonic'
import k from '../kaplayCtx'
import gameSettings from '../utils'

export default function game() {
    const citySfx = k.play("city", { volume: 0.2, loop: true });
    k.setGravity(3100)

    const bgPieces = [
        bgParallaxFirstFrame(),
        bgParallaxSecondFrame(),
    ]

    const platforms = [
        platformParallaxFirstFrame(),
        platformParallaxSecondFrame(),
    ]

    const controlsText = k.add([
        k.text("Press Space/Click/Touch to Jump!", {
            font: "mania",
            size: 64,
        }),
        k.anchor("center"),
        k.pos(k.center()),
    ]);

    const dismissControlsAction = k.onButtonPress("jump", () => {
        k.destroy(controlsText);
        dismissControlsAction.cancel();
    });

    let score = 0
    let scoreMultiplier = 0

    const scoreText = k.add([
        k.text(`SCORE : ${score}`, { font: "mania", size: 72 }),
        k.pos(20, 20),
    ])

    let gameSpeed = 200

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
            scoreMultiplier += 1
            score += 10 * scoreMultiplier
            scoreText.text = `SCORE : ${score}`
            if (scoreMultiplier === 1)
                sonic.ringCollectUI.text = `+${10 * scoreMultiplier}`;
            if (scoreMultiplier > 1) sonic.ringCollectUI.text = `x${scoreMultiplier}`;
            k.wait(1, () => {
                sonic.ringCollectUI.text = "";
            });
            return
        }

        k.play("hurt", { volume: 0.5 })
        k.setData("current-score", score);
        k.go("gameover", citySfx);
    })
    sonic.onCollide("ring", (ring) => {
        k.play("ring", { volume: 0.5 })
        k.destroy(ring)
        score++
        scoreText.text = `SCORE : ${score}`
        sonic.ringCollectUI.text = "+1";
        k.wait(1, () => {
            sonic.ringCollectUI.text = "";
        });
    })

    const spawnMotoBug = () => {
        const motobug = makeMotobug(k.vec2(1950, 773));

        motobug.onUpdate(() => {
            if (gameSpeed < 3000) {
                motobug.move(-(gameSpeed + 300), 0);
                return;
            }
            motobug.move(-gameSpeed, 0);
        });

        motobug.onExitScreen(() => {
            if (motobug.pos.x < 0) k.destroy(motobug);
        });

        const waitTime = k.rand(0.5, 2.5);

        k.wait(waitTime, spawnMotoBug);
    };

    spawnMotoBug();

    const spawnRing = () => {
        const rand = k.rand(0, 180)
        const ring = makeRing(k.vec2(1950, 745 - rand));

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
        if (sonic.isGrounded()) scoreMultiplier = 0;
        platformUpdate(platforms, gameSpeed)
        bgUpdate(bgPieces)
    })
}