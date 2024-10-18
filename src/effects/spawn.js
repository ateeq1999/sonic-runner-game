export function spawnObject(object, waitTime, gameSpeed) {
        object.onUpdate(() => {
            if (gameSpeed < 3000) {
                object.move(-(gameSpeed + 300), 0)
                return
            }

            object.move(-gameSpeed, 0)
        })

        object.onExitScreen(() => {
            if (object.pos.x < 0) k.destroy(object);

            k.wait(waitTime, spawnObject)
        })
}