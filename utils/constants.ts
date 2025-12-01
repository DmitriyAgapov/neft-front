export const dataMenu = [
    {
        title: "Продукция",
        href: "/product",
        subitems: [
            {
                title: "Перемешивающие устройства (мешалки)",
                href: "mixers",
            },
            {
                title: "Система контроля наличия газа и жидких углеводородов в магистрали",
                href: "sistema-kontrolya-nalichiya-gaza-i-zhidkih-uglevodorodov-v-magistrali"
            },
            {
                title: "Сигнализатор сдвига цистерн",
                href: "signalizator-sdviga-czistern"
            },
            {
                title: "Гидравлический инструмент «КРАБ»",
                href: "hydraulic-tools"
            }
        ]
    },
    {
        title: "О компании",
        href: "/about",
    },
    {
        title: "Документы",
        href: "/docs"
    },
    {
        title: "События",
        href: "/events"
    },
    {
        title: "Контакты",
        href: "/contacts"
    }
]

export const urls:Record<string, string> = {
	"press-krab-nh-67-04-000-100ts" : `/hydro/press/`,
	"press-krab-nh-41-09-000-50ts" : `/hydro/press1/`,
	"press-krab-nh-41-06-000-36ts" : `/hydro/press2/`,
	"nasosnaya-stancziya-nh-67-12-000" : `/hydro/nasos-station/`,
	"nasosnaya-stancziya-nh-67-12-000-01" : `/hydro/nasos-station/`,
	"nasosnaya-stancziya-nh-67-17-000-01" : `/hydro/nasos-station2/`,
	"nasosnaya-stancziya-nh-67-17-000" : `/hydro/nasos-station2/`,
}
