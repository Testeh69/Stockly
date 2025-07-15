
help:
	@echo "Cibles disponibles :"
	@echo "  make dev      - Démarrer Expo en mode développement"
	@echo "  make build    - Build APK(profil preview)"


dev:
	npx expo start


build:
	eas build -p android --profile preview