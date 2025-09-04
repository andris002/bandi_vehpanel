local function getgroup(src)
    local isadmin = false
    local group

    if Config.Framework == 'esx' then 
        local ESX = exports['es_extended']:getSharedObject()
        local p = ESX.GetPlayerFromId(src)
        if not p then return false end
        group = p.getGroup()
    elseif Config.Framework == 'qb' then
        local QBCore = exports['qb-core']:GetCoreObject()
        local Player = QBCore.Functions.GetPlayer(src)
        if not Player then return false end

        group = Player.PlayerData.permission
    end

    for _, v in ipairs(Config.Groups) do
        if v == group then 
            isadmin = true
        end
    end

    return isadmin
end

lib.callback.register('vehpanel:getgroup', function(src)
    return getgroup(src)
end)