# Local (default serve, host 0.0.0.0)
npx nx serve public-portal
# Deployed builds
npx nx build public-portal --configuration=dev
npx nx build public-portal --configuration=qa
npx nx build public-portal --configuration=production