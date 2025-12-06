package api

import (
	"github.com/jelius-sama/logger"
	"os"
)

func (a *App) GetDirectory(path string) ([]os.DirEntry, error) {
	rootDir, err := os.ReadDir(path)
	var dirs []os.DirEntry

	// INFO: Loop through the root directory and then append all of them to the variable dirs
	// NOTE: It is not recursive as of right now.
	for i := range rootDir {
		if rootDir[i].Type().IsDir() {
			dirs = append(dirs, rootDir[i])
		}
	}

	if err != nil {
		logger.Error("GetDirectory():", err)
		return nil, err
	}

	logger.Debug("GetDirectory():", rootDir)

	return dirs, nil
}
