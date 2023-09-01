'use client'

import clsx from 'clsx';
import { useState } from 'react';

import { GitHubIcon, NpmIcon } from '@/components/ExtraIcons';
import { SectionButton } from '@/components/sections/SectionButton';
import SectionContent from '@/components/sections/SectionContent';
import SectionTitle from '@/components/sections/SectionTitle';
import AppWindow from '@/components/wireframes/AppWindow';
import GitHubWireframe from '@/components/wireframes/Github';
import NpmWireframe from '@/components/wireframes/Npm';

function ProjectsContents() {
  const [currentState, setCurrentState] = useState<'npm' | 'github'>('github');

  return (
    <>

    <main className='w-11/12 m-30'>

      {/* <SectionTitle
        title="Yet Another Way To Boost "
        caption="LOGLIB"
        description="Introducing a privacy-centric web analytics platform designed for everyone. Gain valuable insights into your website visitors while prioritizing their privacy. Additionally, we offer free plans that allow you to access and enhance your website's performance."
        button={{
          title: 'learn more',
          href: '/docs',
        }}
        /> */}
      </main>
      <SectionContent>
        <div className={clsx('flex', 'lg:gap-12')}>
          <div className={clsx('hidden flex-1 flex-col gap-3 pt-8', 'lg:flex')}>
            <div className={clsx('flex flex-col gap-3')}>
              <SectionButton
                title="Available on GitHub"
                icon={<GitHubIcon className={clsx('my-2 h-16 w-16')} />}
                description="Access powerful and flexible package on GitHub with MIT license."
                active={currentState === 'github'}
                onClick={() => setCurrentState('github')}
              />
              <SectionButton
                title="npm package"
                icon={<NpmIcon className={clsx('my-2 h-16 w-16')} />}
                description="Install and use the package with ease thanks to its typed options."
                active={currentState === 'npm'}
                onClick={() => setCurrentState('npm')}
              />
            </div>
          </div>
          <div className={clsx('w-full', 'lg:w-auto')}>
            <div className={clsx('-mt-[41px]')}>
              <div className={clsx('w-full', 'lg:h-[400px] lg:w-[600px]')}>
                <AppWindow
                  type="browser"
                  browserTabs={[
                    {
                      icon: <GitHubIcon className="h-4 w-4" />,
                      title: 'loglib/loglib - GitHub',
                      isActive: currentState === 'github',
                    },
                    {
                      icon: <NpmIcon className="h-4 w-4" />,
                      title: '@Loglib/tracker - npm',
                      isActive: currentState === 'npm',
                    },
                  ]}
                >
                  {currentState === 'github' && (
                    <GitHubWireframe
                      author="loglob"
                      license="MIT"
                      repository="loglib"
                      description="Yet another web analytics tool"
                    />
                  )}
                  {currentState === 'npm' && (
                    <NpmWireframe
                      packageName="@loglib/tracker"
                      description="Yet another web analytics tool"
                      isWithTypeScript
                    />
                  )}
                </AppWindow>
              </div>
            </div>
          </div>
        </div>
      </SectionContent>
    </>
  );
}

export default ProjectsContents;
