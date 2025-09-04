local opened = false
local isAdmin = false

RegisterCommand(Config.Command, function()
    isAdmin = lib.callback.await('vehpanel:getgroup', false)
    if not isAdmin then return end
    SendNUIMessage({type = 'open'})
    SetNuiFocus(true, true)
end, false)

RegisterNuiCallback('close', function(_, cb)
    opened = false
    isAdmin = false
    SetNuiFocus(false, false)
    cb('ok')
end)

RegisterNuiCallback('fix', function(_, cb)
    if isAdmin then 
        local vehicle = GetVehiclePedIsIn(PlayerPedId(), false)
        if vehicle ~= 0 then 
            SetVehicleEngineHealth(vehicle, 1000)
            SetVehicleEngineOn(vehicle, true, true, true)
            SetVehicleFixed(vehicle)
        end
    end
    cb('ok')
end)

RegisterNuiCallback('replace', function(_, cb)
    if isAdmin then 
        local vehicle = GetVehiclePedIsIn(PlayerPedId(), false)
        if vehicle ~= 0 then 
            SetVehicleEngineHealth(vehicle, 1000)
            SetVehicleEngineOn(vehicle, true, true, true)
            SetVehicleFixed(vehicle)
            local c = GetEntityCoords(PlayerPedId())
            SetEntityCoords(vehicle, c.x, c.y, c.z, false, false, false, false)
            SetEntityHeading(vehicle, GetEntityHeading(PlayerPedId()))
        end
    end
    cb('ok')
end)

RegisterNuiCallback('clean', function(_, cb)
    if isAdmin then 
        local vehicle = GetVehiclePedIsIn(PlayerPedId(), false)
        if vehicle ~= 0 then 
		    SetVehicleDirtLevel(vehicle, 0)
        end
    end
    cb('ok')
end)

RegisterNuiCallback('tireremove', function(num, cb)
    if isAdmin then 
        local vehicle = GetVehiclePedIsIn(PlayerPedId(), false)
        BreakOffVehicleWheel(vehicle, num, true, false, true, false)
    end
    cb('ok')
end)

RegisterNuiCallback('doorremove', function(num, cb)
    if isAdmin then 
        local vehicle = GetVehiclePedIsIn(PlayerPedId(), false)
        SetVehicleDoorBroken(vehicle, num, false)
    end
    cb('ok')
end)

RegisterKeyMapping(Config.Command, 'Open Vehicle Panel', 'keyboard', Config.Key)