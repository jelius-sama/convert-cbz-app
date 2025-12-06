package api

import (
	"github.com/jelius-sama/logger"
	"os"
)

func (a *App) GetFolder(path string) (string, error) {
	logger.Info("GetFolder() Called")

	inf, err := os.Lstat(path)

	if err != nil {
		logger.Error("GetFolder():", err)
		return err.Error(), err
	}

	logger.Debug("GetFolder():", inf)

	return inf.Name(), nil
}
