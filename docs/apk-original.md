# Ozorio Fit — APK pessoal com a ficha original

## Escopo
- Fonte única: `src/data/originalWorkouts.json`, extraída da ficha fotografada.
- 33 exercícios A–E, com ordem e prescrições mantidas. Descanso não estava nas fotos: **não inventar**.
- A ficha confortável já existente permanece disponível na página web e é separada da original.
- `src/components/OriginalWorkouts.tsx`: tela React responsiva do site.
- `android/app/src/main/assets/index.html`: miniaplicativo Android WebView autônomo, offline-first, sem login.
- `android/app/src/main/java/br/com/ozorio/fit/MainActivity.java`: WebView seguro com `WebViewAssetLoader`.
- `android/app/src/main/res/drawable/ic_launcher.xml`: ícone premium vetorial.
- `.github/workflows/build-apk.yml`: compila e publica APK debug de instalação direta.

## Dependências e segurança
Android Gradle Plugin 8.7.3, Gradle 8.10.2, JDK 17, compileSdk 35.
Apenas INTERNET; sem permissões de câmera/localização/contatos.
O conteúdo HTML e as fichas são locais; GIFs são URLs HTTPS de bibliotecas públicas do GitHub. Não baixamos nem redistribuímos os GIFs dentro do APK.
A chave de assinatura debug do GitHub Actions é de desenvolvimento, não deve ser usada para publicação comercial. Atualizações futuras podem exigir desinstalação se a assinatura mudar.

## Construção local
```bash
mkdir -p android/app/src/main/assets
cp src/data/originalWorkouts.json android/app/src/main/assets/workouts.json
gradle -p android :app:assembleDebug
```
Saída: `android/app/build/outputs/apk/debug/app-debug.apk`.

## Testes
```bash
npm install
npm test
npm run build
```
GitHub Actions compila APK, valida conteúdo ZIP e publica como asset de release após a integração.

## QA manual no Android
1. Instalar o APK Android 7.0+ (Android 16 também).
2. Conferir todas as abas A–E: 7/7/6/7/6 exercícios.
3. Abrir uma imagem e conferir GIF grande, séries, repetições, descanso “Não informado”, carga “A definir” e instrução.
4. Testar marcações persistindo ao fechar o aplicativo e abrir novamente.
5. Desligar internet: fichas devem abrir, GIFs podem indicar indisponibilidade sem causar travamento.
6. Reabrir com rede, conferir links externos e o comportamento do botão voltar.
7. Conferir o ícone azul/dourado na tela inicial do Android.

A ficha contém duas inconsistências das próprias fotos, explicitadas no modal: crucifixo no banco reto/inclinado e prancha “3 × 12”. Confirme com o professor.
