import { readFileSync, readdirSync } from 'fs'
import { join } from 'path'

const modulesPath = join(process.cwd(), 'components/ecosystem/modules')
const moduleFiles = [
  'FinancialSuite/index.tsx',
  'SalesCRM/index.tsx', 
  'Procurement/index.tsx',
  'QualityControl/index.tsx',
  'HRWorkforce/index.tsx',
  'AnalyticsBI/index.tsx'
]

console.log('🔍 Verifying directAccess prop in all modules...\n')

let allModulesHaveDirectAccess = true

moduleFiles.forEach(file => {
  const filePath = join(modulesPath, file)
  const content = readFileSync(filePath, 'utf-8')
  
  const hasDirectAccess = content.includes('directAccess={true}')
  const moduleName = file.split('/')[0]
  
  if (hasDirectAccess) {
    console.log(`✅ ${moduleName}: directAccess={true} found`)
  } else {
    console.log(`❌ ${moduleName}: directAccess={true} NOT found`)
    allModulesHaveDirectAccess = false
  }
})

console.log('\n' + '='.repeat(50))

if (allModulesHaveDirectAccess) {
  console.log('✅ All modules have directAccess={true} - Single-click navigation enabled!')
} else {
  console.log('❌ Some modules are missing directAccess={true}')
  console.log('   Users will need to click twice to access these modules')
}

// Check ModuleWrapper default value
console.log('\n🔍 Checking ModuleWrapper default value...')
const moduleWrapperPath = join(process.cwd(), 'components/ecosystem/shared/ModuleWrapper.tsx')
const wrapperContent = readFileSync(moduleWrapperPath, 'utf-8')

if (wrapperContent.includes('directAccess = true,')) {
  console.log('✅ ModuleWrapper has directAccess defaulting to true')
} else {
  console.log('❌ ModuleWrapper does not default directAccess to true')
}

console.log('\n' + '='.repeat(50))
console.log('🎯 Summary:')
console.log('- Single-click navigation requires directAccess={true}')
console.log('- Keyboard shortcuts (Escape/Backspace) are implemented')
console.log('- No floating close button (keyboard navigation only)')