'use strict'

import Message from './modules/messages'

chrome.runtime.sendMessage(Message.create(Message.types.newPageLoading))
