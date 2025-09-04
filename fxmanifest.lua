fx_version 'cerulean'
game 'gta5'
author 'Bandi'
lua54 'yes'

shared_script '@ox_lib/init.lua'
client_script 'client/*.lua'
server_script 'server/*.lua'
shared_script 'config.lua'

ui_page 'ui/index.html'
files {
    'ui/*.*',
    'ui/icons/*.png'
}