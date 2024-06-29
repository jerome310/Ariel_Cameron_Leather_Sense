# Shopify Clone Steps
1) Create a blank repo and connect your new project to that repo (Do not clone bernard repo into your created shopify project it pop up with errors)
2) Create all the FOLDERS that's needed for a Shopify theme using the project named "Elizabeth_Clean" zip file that you have in your desktop and just grab the FOLDERS NOT THE FILES INSIDE
2) Copy the FILES now and move them inside the folders that they're suppose to be located
3) Use these commands: git init, git add ., git commit -m 'put a description', git push
4) FINALLY you're done with creating your shopify github repo

# Shopify Creating Store Steps
1) Use command shopify theme dev --store "your store name" check the example down below if you need help
2) Shopify shortcut command after you do the command above "shopify theme dev" 
# Example: Connecting your store: shopify theme dev --store liquidland.myshopify.com

# Shopify CLI Error
IGNORE THAT VIDEO! It'll ignore your tailwind files which won't give you the css for it

# Tailwind CSS Command
npx tailwindcss -i ./src/tailwind.css -o ./assets/application.css --watch 
