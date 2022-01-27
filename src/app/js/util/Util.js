class Util {
    static stepIterator(array) {
        let i = -1
        return {
            next: function() {
                if (this.hasNext()) ++i
                return {
                    value: array[i],
                    index: i
                }
            },
            prev: function() {
                if (this.hasPrev()) --i
                return {
                    value: array[i],
                    index: i
                }
            },
            hasNext: function() {
                return i < array.length - 1
            },
            hasPrev: function() {
                return i > 0
            },
        }
    }

    static sleep(ms) {
        return new Promise(resolve => setTimeout(resolve, ms))
    }

    static warn(page, message) {
        if (!message) return page.$eval('#aviso-div', e => e.setAttribute('hidden', 'true'))

        page.$eval('#aviso', (e, txt) => e.innerText = txt, message);
        page.$eval('#aviso-div', e => e.removeAttribute('hidden'))
    }

    static #showHideChild(parent, child) {
        const position = parent.getPosition()

        if (child.isVisible()) {
            parent.setPosition(position[0] + 241, position[1])
            return child.hide()
        }

        child.setPosition(position[0] + 241, position[1])
        parent.setPosition(position[0] - 241, position[1])
        return child.show()
    }

    static async popup(fn, parent, child) {
        Util.#showHideChild(parent, child)
        await fn
        Util.#showHideChild(parent, child)
    }
}

module.exports = Util