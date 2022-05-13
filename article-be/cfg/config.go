package cfg

import (
	"fmt"
	"github.com/spf13/viper"
)

var ConfigMap = make(map[string]interface{})

func ReadEnv(path string) {
	viper.SetConfigFile(fmt.Sprintf("%s/.env", path))
	viper.AddConfigPath("../")
	err := viper.ReadInConfig() // Find and read the config file
	if err != nil {             // Handle errors reading the config file
		panic(fmt.Errorf("Fatal error config file: %w \n", err))
	}
	ConfigMap["DB_STR"] = viper.Get("DB_STR")
	ConfigMap["SERVER_PORT"] = viper.Get("SERVER_PORT")
	ConfigMap["SECRET_KEY"] = viper.Get("SECRET_KEY")
	ConfigMap["TOKEN_LIFESPAN"] = viper.Get("TOKEN_HOUR_LIFESPAN")
}
