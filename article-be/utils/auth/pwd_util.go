package auth

import "golang.org/x/crypto/bcrypt"

func GeneratePwd(pwd string) (string, error) {
	hashPWd, err := bcrypt.GenerateFromPassword([]byte(pwd), bcrypt.DefaultCost)
	if err != nil {
		return "", err
	}
	return string(hashPWd), nil
}

func ComparePwd(pwd1, pwd2 string) error {
	err := bcrypt.CompareHashAndPassword([]byte(pwd1), []byte(pwd2))
	return err
}
