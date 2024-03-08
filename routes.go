authRoutes := router.Group("/auth")
authRoutes.POST("/login", middleware.CheckThrottling(5), controllers.Login)

apiRoutes := router.Group("/api")
apiRoutes.Use(middleware.CheckAuth())
apiRoutes.POST("/file/upload", middleware.CheckAnyRole(), middleware.LimitMaxFileSizeAdmin(), controllers.ResponseUploadFile)
apiRoutes.GET("/get/all-currencies", middleware.CheckAnyRole(), controllers.GetAllCurrencies)
apiRoutes.GET("/get/casino-currencies", middleware.CheckAnyRole(), controllers.GetCasinoCurrencies)
apiRoutes.GET("/get/game-api-providers", middleware.CheckAnyRole(), controllers.GetGameApiProviders)
apiRoutes.GET("/get/languages", middleware.CheckAnyRole(), controllers.GetLanguages)
apiRoutes.GET("/get/countries", middleware.CheckAnyRole(), controllers.GetCountries)
apiRoutes.GET("/get/payment/providers", middleware.CheckAnyRole(), controllers.GetPaymentProviders)
apiRoutes.GET("/get/withdraw/providers", middleware.CheckAnyRole(), controllers.GetWithdrawProviders)
apiRoutes.GET("/get/sms-providers", middleware.CheckAnyRole(), controllers.GetSmsProviders)
apiRoutes.GET("/get/convert-currency-providers", middleware.CheckAnyRole(), controllers.GetCurrencyConvertProviders)

/* PROFILE ROUTES */
apiRoutes.GET("/get/me", middleware.CheckAnyRole(), controllers.GetMe)
apiRoutes.GET("/get/my/permissions", middleware.CheckAnyRole(), controllers.GetMyPermissions)
apiRoutes.POST("/set/my/password", middleware.CheckAnyRole(), controllers.SetPassword)
/* PROFILE ROUTES */

/* GAME API ROUTES */
apiRoutes.GET("/games/apis/list", middleware.CheckPermission("view_game_api"), controllers.GameApiList)
apiRoutes.GET("/games/apis/list/filters", middleware.CheckPermission("view_game_api"), controllers.GameApiListFilters)
apiRoutes.GET("/games/apis/get/:id", middleware.CheckPermission("view_game_api"), controllers.GameApiGet)
apiRoutes.POST("/games/apis/process", middleware.CheckPermission("handle_game_api"), controllers.GameApiProcess)
apiRoutes.POST("/games/apis/delete/:id", middleware.CheckPermission("handle_game_api"), controllers.GameApiDelete)
/* GAME API ROUTES */

/* GAME ROUTES */
apiRoutes.GET("/get/games", middleware.CheckPermission("view_game"), controllers.GetGames)
apiRoutes.GET("/get/games/providers", middleware.CheckPermission("view_game"), controllers.GetGamesProviders)
apiRoutes.GET("/games/list", middleware.CheckPermission("view_game"), controllers.GamesList)
apiRoutes.GET("/games/list/filters", middleware.CheckPermission("view_game"), controllers.GamesListFilters)
apiRoutes.GET("/games/get/:id", middleware.CheckPermission("view_game"), controllers.GameGet)
apiRoutes.POST("/games/process", middleware.CheckPermission("handle_game"), controllers.GameProcess)
/* GAME ROUTES */

/* GAME CATEGORIES ROUTES */
apiRoutes.GET("/games/categories/list", middleware.CheckPermission("view_game_category"), controllers.GameCategoryList)
apiRoutes.GET("/games/categories/list/filters", middleware.CheckPermission("view_game_category"), controllers.GameCategoryListFilters)
apiRoutes.GET("/games/categories/get/:id", middleware.CheckPermission("view_game_category"), controllers.GameCategoryGet)
apiRoutes.POST("/games/categories/process", middleware.CheckPermission("handle_game_category"), controllers.GameCategoryProcess)
apiRoutes.POST("/games/categories/delete/:id", middleware.CheckPermission("handle_game_category"), controllers.GameCategoryDelete)
apiRoutes.POST("/games/categories/sort", middleware.CheckPermission("handle_game_category"), controllers.GameCategorySort)
apiRoutes.GET("/get/games/categories", middleware.CheckPermissionArray([]string{"view_game_category", "handle_game_category", "handle_settings_general"}), controllers.GetGameCategories)
/* GAME CATEGORIES ROUTES */

/* GAME PROVIDERS ROUTES */
apiRoutes.GET("/games/providers/list", middleware.CheckPermission("view_game_provider"), controllers.GameProviderList)
apiRoutes.GET("/games/providers/list/filters", middleware.CheckPermission("view_game_provider"), controllers.GameProviderListFilters)
apiRoutes.GET("/games/providers/get/:id", middleware.CheckPermission("view_game_provider"), controllers.GameProviderGet)
apiRoutes.POST("/games/providers/process", middleware.CheckPermission("handle_game_provider"), controllers.GameProviderProcess)
apiRoutes.POST("/games/providers/delete/:id", middleware.CheckPermission("handle_game_provider"), controllers.GameProviderDelete)
apiRoutes.POST("/games/providers/sort", middleware.CheckPermission("handle_game_provider"), controllers.GameProviderSort)
/* GAME PROVIDERS ROUTES */

/* PAYMENT PROVIDERS ROUTES */
apiRoutes.GET("/payments/providers/list", middleware.CheckPermission("view_payment_provider"), controllers.PaymentProviderList)
apiRoutes.GET("/payments/providers/list/filters", middleware.CheckPermission("view_payment_provider"), controllers.PaymentProviderListFilters)
apiRoutes.GET("/payments/providers/get/:id", middleware.CheckPermission("view_payment_provider"), controllers.PaymentProviderGet)
apiRoutes.POST("/payments/providers/process", middleware.CheckPermission("handle_payment_provider"), controllers.PaymentProviderProcess)
apiRoutes.POST("/payments/providers/delete/:id", middleware.CheckPermission("handle_payment_provider"), controllers.PaymentProviderDelete)
apiRoutes.GET(
	"/get/payments/providers",
	middleware.CheckPermissionArray([]string{"view_payment_provider", "handle_payment_provider", "view_events", "handle_events"}),
	controllers.GetCasinoPaymentProviders,
)
/* PAYMENT PROVIDERS ROUTES */

/* WITHDRAW PROVIDERS ROUTES */
apiRoutes.GET("/withdraws/providers/list", middleware.CheckPermission("view_withdraw_provider"), controllers.WithdrawProviderList)
apiRoutes.GET("/withdraws/providers/list/filters", middleware.CheckPermission("view_withdraw_provider"), controllers.WithdrawProviderListFilters)
apiRoutes.GET("/withdraws/providers/get/:id", middleware.CheckPermission("view_withdraw_provider"), controllers.WithdrawProviderGet)
apiRoutes.POST("/withdraws/providers/process", middleware.CheckPermission("handle_withdraw_provider"), controllers.WithdrawProviderProcess)
apiRoutes.POST("/withdraws/providers/delete/:id", middleware.CheckPermission("handle_withdraw_provider"), controllers.WithdrawProviderDelete)
apiRoutes.GET(
	"/get/withdraws/providers",
	middleware.CheckPermissionArray([]string{"view_withdraw_provider", "handle_withdraw_provider", "view_events", "handle_events"}),
	controllers.GetCasinoWithdrawProviders,
)
/* WITHDRAW PROVIDERS ROUTES */

/* SLIDER ROUTES */
apiRoutes.GET("/sliders/list", middleware.CheckPermission("view_slider"), controllers.SliderList)
apiRoutes.GET("/sliders/list/filters", middleware.CheckPermission("view_slider"), controllers.SliderListFilters)
apiRoutes.GET("/sliders/get/:id", middleware.CheckPermission("view_slider"), controllers.SliderGet)
apiRoutes.POST("/sliders/process", middleware.CheckPermission("handle_slider"), controllers.SliderProcess)
apiRoutes.POST("/sliders/delete/:id", middleware.CheckPermission("handle_slider"), controllers.SliderDelete)
/* SLIDER ROUTES */

/* EMAIL TEMPLATE ROUTES */
apiRoutes.GET("/email/templates/list", middleware.CheckPermission("view_email_template"), controllers.EmailTemplateList)
apiRoutes.GET("/email/templates/list/filters", middleware.CheckPermission("view_email_template"), controllers.EmailTemplateListFilters)
apiRoutes.GET("/email/templates/get/:id", middleware.CheckPermission("view_email_template"), controllers.EmailTemplateGet)
apiRoutes.POST("/email/templates/process", middleware.CheckPermission("handle_email_template"), controllers.EmailTemplateProcess)
apiRoutes.POST("/email/templates/delete/:id", middleware.CheckPermission("handle_email_template"), controllers.EmailTemplateDelete)
apiRoutes.GET("/get/email/templates", middleware.CheckPermissionArray([]string{"view_email_template", "handle_email_template", "handle_settings_auth"}), controllers.GetEmailTemplates)
/* EMAIL TEMPLATE ROUTES */

/* SETTINGS ROUTES */
apiRoutes.GET("/settings/general", middleware.CheckPermission("handle_settings_general"), controllers.GetSettingsGeneral)
apiRoutes.POST("/settings/general", middleware.CheckPermission("handle_settings_general"), controllers.SetSettingsGeneral)

apiRoutes.GET("/settings/auth", middleware.CheckPermission("handle_settings_auth"), controllers.GetSettingsAuth)
apiRoutes.POST("/settings/auth", middleware.CheckPermission("handle_settings_auth"), controllers.SetSettingsAuth)

apiRoutes.GET("/settings/finances", middleware.CheckPermission("handle_settings_finances"), controllers.GetSettingsFinances)
apiRoutes.POST("/settings/finances", middleware.CheckPermission("handle_settings_finances"), controllers.SetSettingsFinances)

apiRoutes.GET("/settings/verification", middleware.CheckPermission("handle_settings_verification"), controllers.GetSettingsVerification)
apiRoutes.POST("/settings/verification", middleware.CheckPermission("handle_settings_verification"), controllers.SetSettingsVerification)

apiRoutes.GET("/settings/bots", middleware.CheckPermission("handle_settings_bots"), controllers.GetSettingsBots)
apiRoutes.POST("/settings/bots", middleware.CheckPermission("handle_settings_bots"), controllers.SetSettingsBots)

apiRoutes.GET("/settings/apis", middleware.CheckPermission("handle_settings_apis"), controllers.GetSettingsApis)
apiRoutes.POST("/settings/apis", middleware.CheckPermission("handle_settings_apis"), controllers.SetSettingsApis)

apiRoutes.GET("/settings/notifications", middleware.CheckPermission("handle_settings_notifications"), controllers.GetSettingsNotifications)
apiRoutes.POST("/settings/notifications", middleware.CheckPermission("handle_settings_notifications"), controllers.SetSettingsNotifications)

apiRoutes.GET("/settings/converter", middleware.CheckPermission("handle_settings_converter"), controllers.GetSettingsConverter)
apiRoutes.POST("/settings/converter", middleware.CheckPermission("handle_settings_converter"), controllers.SetSettingsConverter)

apiRoutes.GET("/settings/profile", middleware.CheckPermission("handle_settings_profile"), controllers.GetSettingsProfile)
apiRoutes.POST("/settings/profile", middleware.CheckPermission("handle_settings_profile"), controllers.SetSettingsProfile)

apiRoutes.GET("/settings/bonuses", middleware.CheckPermission("handle_settings_bonuses"), controllers.GetSettingsBonus)
apiRoutes.POST("/settings/bonuses", middleware.CheckPermission("handle_settings_bonuses"), controllers.SetSettingsBonus)
/* SETTINGS ROUTES */

/* BOTS ROUTES */
apiRoutes.GET("/users/bots/list", middleware.CheckPermission("view_bots"), controllers.BotList)
apiRoutes.GET("/users/bots/list/filters", middleware.CheckPermission("view_bots"), controllers.BotListFilters)
apiRoutes.GET("/users/bots/get/:id", middleware.CheckPermission("view_bots"), controllers.BotGet)
apiRoutes.POST("/users/bots/process", middleware.CheckPermission("handle_bots"), controllers.BotProcess)
apiRoutes.POST("/users/bots/delete/:id", middleware.CheckPermission("handle_bots"), controllers.BotDelete)
/* BOTS ROUTES */

/* EVENTS ROUTES */
apiRoutes.GET("/casino/events/list", middleware.CheckPermission("view_events"), controllers.EventList)
apiRoutes.GET("/casino/events/list/filters", middleware.CheckPermission("view_events"), controllers.EventListFilters)
apiRoutes.GET("/casino/events/get/:id", middleware.CheckPermission("view_events"), controllers.EventGet)
apiRoutes.POST("/casino/events/process", middleware.CheckPermission("handle_events"), controllers.EventProcess)
apiRoutes.POST("/casino/events/delete/:id", middleware.CheckPermission("handle_events"), controllers.EventDelete)

apiRoutes.GET("/get/casino/events", middleware.CheckPermissionArray([]string{"view_events", "handle_events"}), controllers.GetEvents)
/* EVENTS ROUTES */

/* USER VERIFICATION  ROUTES */
apiRoutes.GET("/users/verifications/await", middleware.CheckPermission("handle_user_verifications"), controllers.UserVerificationsAwait)
apiRoutes.GET("/users/verifications/await/filters", middleware.CheckPermission("handle_user_verifications"), controllers.UserVerificationsFilters)
apiRoutes.GET("/users/verifications/closed", middleware.CheckPermission("handle_user_verifications"), controllers.UserVerificationsFilters)
apiRoutes.GET("/users/verifications/closed/filters", middleware.CheckPermission("handle_user_verifications"), controllers.UserVerificationsFilters)

apiRoutes.GET("/users/verifications/get/:id", middleware.CheckPermission("handle_user_verifications"), controllers.UserVerificationsGet)
apiRoutes.GET("/users/verification/document/:id", middleware.CheckPermissionArray([]string{"handle_user_verifications"}), controllers.UserVerificationDocument)

apiRoutes.POST("/users/verifications/process", middleware.CheckPermission("handle_user_verifications"), controllers.UserVerificationConfirm)
apiRoutes.POST("/users/verifications/process/:id", middleware.CheckPermission("handle_user_verifications"), controllers.UserVerificationDecline)
/* USER VERIFICATION ROUTES */

/* PAYMENT TRANSACTION ROUTES */
apiRoutes.GET("/payments/transactions/list", middleware.CheckPermission("view_payment_transaction"), controllers.PaymentTransactionsList)
apiRoutes.GET("/payments/transactions/list/filters", middleware.CheckPermission("view_payment_transaction"), controllers.PaymentTransactionsListFilters)
apiRoutes.GET("/payments/transactions/get/:id", middleware.CheckPermission("view_payment_transaction"), controllers.PaymentTransactionGet)
apiRoutes.POST("/payments/transactions/process", middleware.CheckPermission("handle_payment_transaction"), controllers.PaymentTransactionProcess)

apiRoutes.GET("/payments/transactions/logs/:id", middleware.CheckPermission("view_payment_transaction"), controllers.PaymentLogs)
apiRoutes.GET("/payments/transactions/logs/:id/filters", middleware.CheckPermission("view_payment_transaction"), controllers.PaymentLogsFilters)
/* PAYMENT TRANSACTION ROUTES */

/* WITHDRAW TRANSACTION ROUTES */
apiRoutes.GET("/withdraws/transactions/list", middleware.CheckPermission("view_withdraw_transaction"), controllers.WithdrawTransactionsList)
apiRoutes.GET("/withdraws/transactions/list/filters", middleware.CheckPermission("view_withdraw_transaction"), controllers.WithdrawTransactionsListFilters)
apiRoutes.GET("/withdraws/transactions/get/:id", middleware.CheckPermission("view_withdraw_transaction"), controllers.WithdrawTransactionGet)
apiRoutes.POST("/withdraws/transactions/process", middleware.CheckPermission("handle_withdraw_transaction"), controllers.WithdrawTransactionProcess)

apiRoutes.GET("/withdraws/transactions/logs/:id", middleware.CheckPermission("view_withdraw_transaction"), controllers.WithdrawLogs)
apiRoutes.GET("/withdraws/transactions/logs/:id/filters", middleware.CheckPermission("view_withdraw_transaction"), controllers.WithdrawLogsFilters)
/* WITHDRAW TRANSACTION ROUTES */

/* USER STATUSES ROUTES */
apiRoutes.GET("/users/statuses/list", middleware.CheckPermission("view_user_statuses"), controllers.UserStatusList)
apiRoutes.GET("/users/statuses/list/filters", middleware.CheckPermission("view_user_statuses"), controllers.UserStatusListFilters)
apiRoutes.GET("/users/statuses/get/:id", middleware.CheckPermission("view_user_statuses"), controllers.UserStatusGet)
apiRoutes.POST("/users/statuses/process", middleware.CheckPermission("handle_user_statuses"), controllers.UserStatusProcesss)
apiRoutes.POST("/users/statuses/delete/:id", middleware.CheckPermission("handle_user_statuses"), controllers.UserStatusDelete)
apiRoutes.GET(
	"/get/users/statuses",
	middleware.CheckPermissionArray([]string{"view_user_statuses", "handle_user_statuses", "view_users", "handle_users", "view_events", "handle_events"}),
	controllers.GetUserStatuses,
)
/* USER STATUSES ROUTES */

/* USER ROUTES */
apiRoutes.GET("/get/users", middleware.CheckPermissionArray([]string{"view_users", "handle_users", "view_events", "handle_events"}), controllers.GetUsers)
/* USER ROUTES */

/* EVENTS GROUPS ROUTES */
apiRoutes.GET("/casino/events/groups/list", middleware.CheckPermission("view_events"), controllers.EventGroupList)
apiRoutes.GET("/casino/events/groups/list/filters", middleware.CheckPermission("view_events"), controllers.EventGroupListFilters)
apiRoutes.GET("/casino/events/groups/get/:id", middleware.CheckPermission("view_events"), controllers.EventGroupGet)
apiRoutes.POST("/casino/events/groups/process", middleware.CheckPermission("handle_events"), controllers.EventGroupProcess)
apiRoutes.POST("/casino/events/groups/delete/:id", middleware.CheckPermission("handle_events"), controllers.EventGroupDelete)

apiRoutes.GET("/get/casino/events/groups", middleware.CheckPermissionArray([]string{"view_events", "handle_events"}), controllers.GetEventGroups)
/* EVENTS GROUPS ROUTES */

/* SUPPORT CHAT ROUTES */
apiRoutes.GET("/settings/support-chat", middleware.CheckPermission("handle_settings_support_chat"), controllers.GetSettingsSupportChat)
apiRoutes.POST("/settings/support-chat", middleware.CheckPermission("handle_settings_support_chat"), controllers.SetSettingsSupportChat)

apiRoutes.GET("/support-chat/faqs/list", middleware.CheckPermission("view_chat_faqs"), controllers.ChatFaqList)
apiRoutes.GET("/support-chat/faqs/list/filters", middleware.CheckPermission("view_chat_faqs"), controllers.ChatFaqListFilters)
apiRoutes.GET("/support-chat/faqs/get/:id", middleware.CheckPermission("view_chat_faqs"), controllers.ChatFaqGet)
apiRoutes.POST("/support-chat/faqs/process", middleware.CheckPermission("handle_chat_faqs"), controllers.ChatFaqProcess)
apiRoutes.POST("/support-chat/faqs/delete/:id", middleware.CheckPermission("handle_chat_faqs"), controllers.ChatFaqDelete)
apiRoutes.GET(
	"/get/support-chat/faqs",
	middleware.CheckPermissionArray(
		[]string{"handle_chat", "handle_settings_support_chat", "view_chat_faqs", "handle_chat_faqs", "view_chat_faqs_groups", "handle_chat_faqs_groups"},
	),
	controllers.GetChatFaqs,
)

apiRoutes.GET("/support-chat/faqs/groups/list", middleware.CheckPermission("view_chat_faqs_groups"), controllers.ChatFaqGroupList)
apiRoutes.GET("/support-chat/faqs/groups/list/filters", middleware.CheckPermission("view_chat_faqs_groups"), controllers.ChatFaqGroupListFilters)
apiRoutes.GET("/support-chat/faqs/groups/get/:id", middleware.CheckPermission("view_chat_faqs_groups"), controllers.ChatFaqGroupGet)
apiRoutes.POST("/support-chat/faqs/groups/process", middleware.CheckPermission("handle_chat_faqs_groups"), controllers.ChatFaqGroupProcess)
apiRoutes.POST("/support-chat/faqs/groups/delete/:id", middleware.CheckPermission("handle_chat_faqs_groups"), controllers.ChatFaqGroupDelete)
apiRoutes.GET(
	"/get/support-chat/faqs/groups",
	middleware.CheckPermissionArray(
		[]string{"handle_chat", "handle_settings_support_chat", "view_chat_faqs", "handle_chat_faqs", "view_chat_faqs_groups", "handle_chat_faqs_groups"},
	),
	controllers.GetChatFaqGroups,
)
/* SUPPORT CHAT ROUTES */

/* USER NOTES ROUTES */
apiRoutes.GET("/users/notes/list", middleware.CheckPermission("view_user_notes"), controllers.UserNoteList)
apiRoutes.GET("/users/notes/list/filters", middleware.CheckPermission("view_user_notes"), controllers.UserNoteListFilters)

apiRoutes.POST("/users/notes/process", middleware.CheckPermission("handle_user_notes"), controllers.UserNoteProcesss)
apiRoutes.POST("/users/notes/delete/:id", middleware.CheckPermission("handle_user_notes"), controllers.UserNoteDelete)
/* USER NOTES ROUTES */

/* AFFILIATE ROUTES */
apiRoutes.GET("/settings/affiliate", middleware.CheckPermission("view_affiliate_offers"), controllers.GetSettingsAffiliate)
apiRoutes.POST("/settings/affiliate", middleware.CheckPermission("view_affiliate_offers"), controllers.SetSettingsAffiliate)

apiRoutes.GET("/affiliate/offers/list", middleware.CheckPermission("view_affiliate_offers"), controllers.AffiliateOfferList)
apiRoutes.GET("/affiliate/offers/list/filters", middleware.CheckPermission("view_affiliate_offers"), controllers.AffiliateOfferListFilters)
apiRoutes.POST("/affiliate/offers/create", middleware.CheckPermission("handle_affiliate_offers"), controllers.AffiliateOfferCreate)
apiRoutes.GET("/affiliate/offers/get/:id", middleware.CheckPermission("view_affiliate_offers"), controllers.AffiliateOfferGet)
apiRoutes.POST("/affiliate/offers/process", middleware.CheckPermission("handle_affiliate_offers"), controllers.AffiliateOfferProcess)

apiRoutes.GET("/affiliate/medias/list", middleware.CheckPermission("view_affiliate_media"), controllers.AffiliateMediaList)
apiRoutes.GET("/affiliate/medias/list/filters", middleware.CheckPermission("view_affiliate_media"), controllers.AffiliateMediaListFilters)
apiRoutes.GET("/affiliate/medias/get/:id", middleware.CheckPermission("view_affiliate_media"), controllers.AffiliateMediaGet)
apiRoutes.POST("/affiliate/medias/process", middleware.CheckPermission("handle_affiliate_media"), controllers.AffiliateMediaProcess)
apiRoutes.POST("/affiliate/medias/delete/:id", middleware.CheckPermission("handle_affiliate_media"), controllers.AffiliateMediaDelete)
/* AFFILIATE ROUTES */

/* DOMAINS ROUTES */
domainsRoutes := apiRoutes.Group("/casino/domains")
domainsRoutes.Use(middleware.CheckPermissionArray([]string{"view_casino_domains", "handle_casino_domains", "handle_settings_general", "handle_affiliate_offers"}))
domainsRoutes.GET("/list", controllers.CasinoDomainList)
domainsRoutes.GET("/list/filters", controllers.CasinoDomainListFilters)
domainsRoutes.GET("/get/:id", controllers.CasinoDomainGet)
domainsRoutes.POST("/process", middleware.CheckPermission("handle_casino_domains"), controllers.CasinoDomainProcess)
domainsRoutes.POST("/delete/:id", middleware.CheckPermission("handle_casino_domains"), controllers.CasinoDomainDelete)
/* DOMAINS ROUTES */

/* BONUSES TEMPLATE ROUTES */
apiRoutes.GET("/casino/bonuses/template/list", middleware.CheckPermission("view_bonus_template"), controllers.BonusTemplateList)
apiRoutes.GET("/casino/bonuses/template/list/filters", middleware.CheckPermission("view_bonus_template"), controllers.BonusTemplateListFilters)
apiRoutes.GET("/casino/bonuses/template/get/:id", middleware.CheckPermission("view_bonus_template"), controllers.BonusTemplateGet)
apiRoutes.POST("/casino/bonuses/template/process", middleware.CheckPermission("handle_bonus_template"), controllers.BonusTemplateProcess)
apiRoutes.POST("/casino/bonuses/template/delete/:id", middleware.CheckPermission("handle_bonus_template"), controllers.BonusTemplateDelete)

apiRoutes.GET(
	"/get/casino/bonuses/templates",
	middleware.CheckPermissionArray([]string{
		"view_events",
		"handle_events",
		"view_bonus_configurations",
		"view_bonus_template",
		"handle_bonus_template",
	}),
	controllers.GetBonusTemplate,
)
/* BONUSES TEMPLATE ROUTES */

/* DEV ROUTES */
/* TEST ROUTES */
apiRoutes.POST("/test", middleware.CheckPermission("view_dashboard"), controllers.TestResponse)
apiRoutes.POST("/test/upload", middleware.CheckRole("developer"), controllers.TestResponseUploadImage)
apiRoutes.POST("/test/download", middleware.CheckRole("developer"), controllers.TestResponseDownloadImage)
/* TEST ROUTES */

devRoutes := apiRoutes.Group("/dev")
devRoutes.GET("/get/game-providers", middleware.CheckRole("developer"), controllersDev.GetGameProviders)
devRoutes.POST("/import-games", middleware.CheckRole("developer"), controllersDev.GamesImport)
devRoutes.POST("/import-games-images", middleware.CheckRole("developer"), controllersDev.GamesImagesImport)
devRoutes.GET("/games/list", middleware.CheckRole("developer"), controllersDev.GamesList)
devRoutes.GET("/games/list/filters", middleware.CheckRole("developer"), controllersDev.GamesListFilters)
devRoutes.GET("/games/get/:id", middleware.CheckRole("developer"), controllersDev.GameGet)
devRoutes.POST("/games/process", middleware.CheckRole("developer"), controllersDev.EditGame)

devRoutes.GET("/currencies/list", middleware.CheckRole("developer"), controllersDev.CurrenciesList)
devRoutes.GET("/currencies/list/filters", middleware.CheckRole("developer"), controllersDev.CurrenciesListFilters)
devRoutes.GET("/currencies/get/:id", middleware.CheckRole("developer"), controllersDev.CurrencyGet)
devRoutes.POST("/currencies/process", middleware.CheckRole("developer"), controllersDev.CurrencyProcess)
devRoutes.POST("/currencies/delete", middleware.CheckRole("developer"), controllersDev.CurrencyDelete)

devRoutes.GET("/proxies/list", middleware.CheckRole("developer"), controllersDev.ProxyList)
devRoutes.GET("/proxies/list/filters", middleware.CheckRole("developer"), controllersDev.ProxyListFilters)
devRoutes.GET("/proxies/get/:id", middleware.CheckRole("developer"), controllersDev.ProxyGet)
devRoutes.POST("/proxies/create-many", middleware.CheckRole("developer"), controllersDev.ProxyCreateMany)
devRoutes.POST("/proxies/process", middleware.CheckRole("developer"), controllersDev.ProxyProcess)
devRoutes.POST("/proxies/delete", middleware.CheckRole("developer"), controllersDev.ProxyDelete)

devRoutes.GET("/casinos/list", middleware.CheckRole("developer"), controllersDev.CasinoList)
devRoutes.GET("/casinos/list/filters", middleware.CheckRole("developer"), controllersDev.CasinoListFilters)
devRoutes.GET("/casinos/get/:id", middleware.CheckRole("developer"), controllersDev.CasinoGet)
devRoutes.POST("/casinos/delete/:id", middleware.CheckRole("developer"), controllersDev.CasinoDelete)
devRoutes.POST("/casinos/process", middleware.CheckRole("developer"), controllersDev.CasinoProcess)
devRoutes.POST("/casinos/fill/:id", middleware.CheckRole("developer"), controllersDev.FillCasino)

devRoutes.POST("/users/add", middleware.CheckRole("developer"), controllersDev.CreateDevAccount)

devRoutes.POST("/clear-cache", middleware.CheckRole("developer"), controllersDev.ClearCache)
/* DEV ROUTES */

wsRouter := router.Group("/ws")
wsRouter.GET("/support-chat", chat.AdminResponse)