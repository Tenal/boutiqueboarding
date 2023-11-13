import * as React from 'react'
import Tabs from '@mui/material/Tabs'
import Tab from '@mui/material/Tab'
import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'

interface ITabPanelProps {
    children?: React.ReactNode
    index: number
    value: number
}

interface ITabsProps {
    tabOneTitle: string
    tabTwoTitle: string
    tabThreeTitle: string | undefined
    tabOneDesc: string | React.ReactNode
    tabTwoDesc: string | React.ReactNode
    tabThreeDesc: string | React.ReactNode | undefined
}

function CustomTabPanel(props: ITabPanelProps) {
    const { children, value, index, ...other } = props

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box sx={{ p: 2 }}>
                    <Typography>{children}</Typography>
                </Box>
            )}
        </div>
    )
}

export default function BasicTabs({
    tabOneTitle,
    tabTwoTitle,
    tabThreeTitle,
    tabOneDesc,
    tabTwoDesc,
    tabThreeDesc,
}: ITabsProps) {
    const [value, setValue] = React.useState(0)

    const handleChange = (_event: React.SyntheticEvent, newValue: number) => {
        setValue(newValue)
    }

    const a11yProps = (index: number) => ({
        id: `simple-tab-${index}`,
        'aria-controls': `simple-tabpanel-${index}`,
    })

    return (
        <Box sx={{ width: '100%', mr: { xs: 0, md: 3 } }}>
            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                <Tabs
                    value={value}
                    onChange={handleChange}
                    aria-label="basic tabs example"
                >
                    <Tab
                        label={tabOneTitle}
                        {...a11yProps(0)}
                        sx={{
                            fontSize: { xs: '12px', md: '0.875rem' },
                            padding: { xs: '6px 8px', md: '12px 16px' },
                        }}
                    />
                    <Tab
                        label={tabTwoTitle}
                        {...a11yProps(1)}
                        sx={{
                            fontSize: { xs: '12px', md: '0.875rem' },
                            padding: { xs: '6px 8px', md: '12px 16px' },
                        }}
                    />
                    {tabThreeTitle && (
                        <Tab
                            label={tabThreeTitle}
                            {...a11yProps(2)}
                            sx={{
                                fontSize: { xs: '12px', md: '0.875rem' },
                                padding: { xs: '6px 8px', md: '12px 16px' },
                            }}
                        />
                    )}
                </Tabs>
            </Box>
            <CustomTabPanel value={value} index={0}>
                {tabOneDesc}
            </CustomTabPanel>
            <CustomTabPanel value={value} index={1}>
                {tabTwoDesc}
            </CustomTabPanel>
            {tabThreeDesc && (
                <CustomTabPanel value={value} index={2}>
                    {tabThreeDesc}
                </CustomTabPanel>
            )}
        </Box>
    )
}
